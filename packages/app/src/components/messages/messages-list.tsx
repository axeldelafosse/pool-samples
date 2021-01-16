import React, { useContext, useEffect, useCallback, useState } from 'react';
import {
  FlatList,
  Platform,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native';
import ParsedText from 'react-native-parsed-text';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

import { UserIdContext } from '@pool/app/src/components/user-id-context';

import {
  useUpdateCommentReadAtMutation,
  useUpdateMessageReadAtMutation,
  MessageFragment
} from '@pool/app/src/graphql';

import { Flex, Box, Abs, Text } from '@pool/app/src/components/styles';
import UserAvatar from '@pool/app/src/components/user-avatar';
import Icon from '@pool/app/src/components/icon';
import ActivityIndicator from '@pool/app/src/components/activity-indicator';

import Link from '@pool/app/src/components/link/link-card';

import usePrevious from '@pool/app/src/hooks/use-previous';
import useCurrentUser from '@pool/app/src/hooks/use-current-user';
import useTranslation from '@pool/app/src/hooks/use-translation';

import Gallery from './gallery';
import MessageDateTime from './message-date-time';
import Onboarding from './onboarding';

const WWW_URL_PATTERN = /^www\./i;

// 60px header + 60px message box + 65px if in app (bottom sheet padding top)
const List = styled(FlatList)`
  padding: 0 15px 0 25px;
  position: absolute;
  width: 100%;
  top: ${(props) => props.top}px;
  bottom: ${(props) => props.bottom}px;
  max-height: ${(props) =>
    Platform.OS === 'web'
      ? `calc(100vh - 60px - ${props.top}px - ${props.bottom}px)`
      : props.height - props.top - props.bottom - 100};

  ${Platform.select({
    web: `
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      height: fit-content;
    `,
    ios: `
      height: ${(props) => props.contentHeight};
    `,
    android: `
      height: ${(props) => props.height};
    `
  })};
`;

const Message = styled(Box)`
  max-width: 80%;

  align-self: ${({ alignment }) =>
    alignment === 'left' ? 'flex-start' : 'flex-end'};

  border-bottom-left-radius: ${({ groupStyle }) =>
    groupStyle.indexOf('left') !== -1 && !groupStyle.includes('Single')
      ? '5px'
      : '20px'};
  border-bottom-right-radius: ${({ groupStyle }) =>
    groupStyle.indexOf('right') !== -1 &&
    !groupStyle.includes('Single') &&
    groupStyle !== 'rightBottom'
      ? '5px'
      : '20px'};
  border-top-left-radius: ${({ groupStyle }) =>
    groupStyle === 'leftBottom' || groupStyle === 'leftMiddle'
      ? '5px'
      : '20px'};
  border-top-right-radius: ${({ groupStyle }) =>
    groupStyle === 'rightBottom' || groupStyle === 'rightMiddle'
      ? '5px'
      : '20px'};

  margin-top: ${({ groupStyle }) =>
    groupStyle.includes('Middle') || groupStyle.includes('Bottom')
      ? '1px'
      : '16px'};
  margin-bottom: ${({ groupStyle, hasReadReceipts }) =>
    hasReadReceipts
      ? '20px'
      : groupStyle.includes('Middle') || groupStyle.includes('Top')
      ? '1px'
      : '12px'};
`;

const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Find the latest `read_at` of all messages for a specific user id
function getLatestReadReceipt(messages, user) {
  const userReadReceipts = messages
    .map((message) => message.recipients)
    .reduce((acc, val) => acc.concat(val), []) // flat
    .filter((recipient) => recipient.read_at && recipient?.user.id === user.id)
    .sort((a, b) => a.read_at - b.read_at);

  return userReadReceipts[0];
}

const OnboardingLongPress = ({
  t,
  showOnboarding = false,
  isVeryLastMessage = false,
  message,
  groupStyle,
  type
}) => {
  const shouldShowOnboarding =
    showOnboarding ||
    (isVeryLastMessage &&
      type === 'message' &&
      message.text &&
      message.text !== '❤️' &&
      (groupStyle === 'rightBottom' || groupStyle === 'rightSingle'));

  if (!shouldShowOnboarding) {
    return null;
  }

  return (
    <Box mb={2}>
      <Text fontSize={11} textAlign="right" color="rgba(0, 0, 0, 0.25)">
        {t('poll.onboarding.longPress')}
      </Text>
    </Box>
  );
};

interface MessagesListProps {
  pollId: string;
  messages: MessageFragment;
  type: 'comment' | 'message';
  userAgent: string;
  scrollToBottom: () => void;
  fetchMore: ({
    variables
  }: {
    variables: { offset: number };
  }) => Promise<void>;
  isLoading: boolean;
  loadingMore: boolean;
  flatListRef: any;
  top: number;
  bottom: number;
  setShareModal: () => void;
  setAddLinkModal: any;
  setOffset: (offset: boolean) => void;
}

function MessagesList({
  pollId,
  messages,
  type,
  userAgent,
  scrollToBottom,
  fetchMore,
  isLoading,
  loadingMore,
  flatListRef,
  top,
  bottom,
  setShareModal,
  setAddLinkModal,
  setOffset
}: MessagesListProps) {
  const { t } = useTranslation();
  const userId = useContext(UserIdContext);
  const currentUser = useCurrentUser();
  const [markCommentRead] = useUpdateCommentReadAtMutation();
  const [markMessageRead] = useUpdateMessageReadAtMutation();
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const prevMessages = usePrevious(messages);
  const height = useWindowDimensions().height;
  const [showTimes, setShowTimes] = useState([]);
  const [contentHeight, setContentHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  let navigation;
  if (Platform.OS === 'ios') {
    navigation = useNavigation();
  }

  // From https://codesandbox.io/s/react-native-dsyse
  const invertedWheelEvent = useCallback((e) => {
    flatListRef.current.getScrollableNode().scrollTop -= e.deltaY;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const currentRef = flatListRef.current;
    if (messages?.length !== 0 && Platform.OS === 'web' && currentRef) {
      currentRef
        .getScrollableNode()
        .addEventListener('wheel', invertedWheelEvent);

      // enable hardware acceleration
      // makes scrolling fast in safari and firefox
      // https://stackoverflow.com/a/24157294
      currentRef.setNativeProps({
        style: {
          transform: 'translate3d(0, 0, 0) scaleY(-1)'
        }
      });
    }

    return () => {
      if (
        messages?.length !== 0 &&
        Platform.OS === 'web' &&
        currentRef &&
        currentRef.getScrollableNode()
      ) {
        currentRef
          .getScrollableNode()
          .removeEventListener('wheel', invertedWheelEvent);
      }
    };
  });

  const markRead = useCallback(() => {
    messages.map((message) => {
      if (
        message.user.id !== userId &&
        message.recipients.find(
          (recipient) => !recipient.read_at && recipient?.user.id === userId
        )
      ) {
        if (type === 'comment') {
          markCommentRead({
            variables: {
              userId,
              commentId: message.id,
              now: new Date().toISOString()
            }
          });
        } else if (type === 'message') {
          markMessageRead({
            variables: {
              userId,
              messageId: message.id,
              now: new Date().toISOString()
            }
          });
        }
      }
    });
  }, [messages]);

  useEffect(() => {
    if (messages) {
      // Mark read
      markRead();

      const userScrolledUp = scrollYOffset > 0;

      // Handle new messages being sent/received
      const currentLastMessage = messages[0];
      let previousLastMessage = null;
      if (prevMessages) {
        previousLastMessage = prevMessages[0];
      } else if (!userScrolledUp) {
        scrollToBottom();
      }
      if (!previousLastMessage || !currentLastMessage) {
        return;
      }

      const hasNewMessage = currentLastMessage.id !== previousLastMessage.id;
      const isOwner = currentLastMessage.user.id === userId;

      let shouldScrollToBottom = false;

      // Always scroll down when it's your own message that you added...
      if (hasNewMessage && isOwner) {
        shouldScrollToBottom = true;
      } else if (hasNewMessage && !userScrolledUp) {
        shouldScrollToBottom = true;
      }

      if (shouldScrollToBottom) {
        scrollToBottom();
      }
    }
  }, [messages, scrollYOffset]);

  const getGroupStyles = useCallback(
    (m) => {
      if (!m) return;

      const messageGroupStyles = {};
      const messages = [...m];

      for (let i = 0; i < messages?.length; i++) {
        // Messages are ordered by created_at desc
        const previousMessage = messages[i + 1];
        const message = messages[i];
        const nextMessage = messages[i - 1];
        const groupStyles = [];

        const userId = message.user ? message.user.id : null;

        const isTopMessage =
          !previousMessage ||
          (previousMessage.attachments &&
            previousMessage.attachments.length !== 0) ||
          userId !== previousMessage.user.id ||
          previousMessage.type === 'error' ||
          previousMessage.deleted_at;

        const isBottomMessage =
          !nextMessage ||
          (nextMessage.attachments && nextMessage.attachments.length !== 0) ||
          userId !== nextMessage.user.id ||
          nextMessage.type === 'error' ||
          nextMessage.deleted_at;

        if (isTopMessage) {
          groupStyles.push('top');
        }

        if (isBottomMessage) {
          if (isTopMessage || message.deleted_at || message.type === 'error') {
            groupStyles.splice(0, groupStyles.length);
            groupStyles.push('single');
          } else {
            groupStyles.push('bottom');
          }
        }

        if (!isTopMessage && !isBottomMessage) {
          if (message.deleted_at || message.type === 'error') {
            groupStyles.splice(0, groupStyles.length);
            groupStyles.push('single');
          } else {
            groupStyles.splice(0, groupStyles.length);
            groupStyles.push('middle');
          }
        }

        if (message.attachments.length !== 0) {
          groupStyles.splice(0, groupStyles.length);
          groupStyles.push('single');
        }

        messageGroupStyles[message.id] = groupStyles;
      }

      return messageGroupStyles;
    },
    [messages]
  );

  const getReadReceipts = useCallback(
    (m) => {
      if (!m) return;

      const messageReadReceipts = {};
      const messages = [...m];

      messages.map((message) => {
        const readReceipts = [];

        message.recipients.map((recipient) => {
          // Latest read message for user
          const latestReadMessage = getLatestReadReceipt(
            messages,
            recipient?.user
          );
          readReceipts.push(latestReadMessage);
        });

        messageReadReceipts[message.id] = readReceipts;
      });

      return messageReadReceipts;
    },
    [messages]
  );

  const groupStyles = getGroupStyles(messages);
  const readReceipts = getReadReceipts(messages);

  const renderItem = useCallback(
    (message) => {
      const alignment = message.user.id === userId ? 'right' : 'left';
      const hasAttachment = message.attachments?.length > 0 ? true : false;
      const groupStyle =
        alignment +
        capitalize(hasAttachment ? 'bottom' : groupStyles[message.id][0]);
      const messageReadReceipts = readReceipts[message.id];
      const shouldshowTimes = showTimes[message.id];
      const isVeryLastMessage = messages[0]?.id === message.id;

      let isLatestReadByMessage = false;
      message.recipients.map((recipient) => {
        if (
          messageReadReceipts &&
          messageReadReceipts.find(
            (readReceipt) => readReceipt && readReceipt.id === recipient.id
          )
        ) {
          isLatestReadByMessage = true;
        }
      });

      const showTime = () => {
        showTimes[message.id] = Boolean(!showTimes[message.id]);
        setShowTimes(showTimes);
        setRefresh(!refresh);
      };

      const addIdea = ({
        messageId,
        sharedMessage,
        sharedImage
      }: {
        messageId: string;
        sharedMessage?: string;
        sharedImage?: string;
      }) => {
        if (Platform.OS === 'web') {
          setAddLinkModal({
            isOpen: true,
            pollId,
            messageId,
            sharedMessage,
            sharedImage
          });
        } else {
          navigation.push('ModalAddIdea', {
            pollId,
            messageId,
            sharedMessage,
            sharedImage
          });
        }
      };

      if (message.text === '' && !hasAttachment) {
        return;
      }

      const isLink = message.__typename === 'links';

      if (message.user.id === userId) {
        if (hasAttachment && !isLink) {
          return (
            <Box
              key={`${message.id}-${message.created_at}`}
              mb={isLatestReadByMessage ? 18 : 16}
            >
              <Gallery
                messageId={message.id}
                attachments={message.attachments}
                alignment="right"
                groupStyle={groupStyle}
                addIdea={addIdea}
              />

              <Box mt={2}>
                <OnboardingLongPress
                  t={t}
                  showOnboarding={isVeryLastMessage}
                  message={message}
                  groupStyle={groupStyle}
                  type={type}
                />
              </Box>

              {isLatestReadByMessage && (
                <Abs
                  display="flex"
                  flexDirection="row"
                  bottom="-18px"
                  right="-14px"
                >
                  {message.recipients.map((recipient) => {
                    if (
                      messageReadReceipts.find(
                        (readReceipt) =>
                          readReceipt && readReceipt.id === recipient.id
                      )
                    ) {
                      return (
                        <Box
                          ml="2px"
                          key={`${recipient?.user.id}-${recipient.id}`}
                        >
                          <UserAvatar size="small" user={recipient?.user} />
                        </Box>
                      );
                    }
                  })}
                </Abs>
              )}
            </Box>
          );
        }

        return (
          <Box key={`${message.id}-${message.created_at}`}>
            {shouldshowTimes && (
              <MessageDateTime createdAt={message.created_at} />
            )}

            <TouchableOpacity
              activeOpacity={isLink ? 1 : 0.9}
              onPress={isLink ? () => {} : showTime}
              onLongPress={
                isLink
                  ? () => {}
                  : () =>
                      addIdea({
                        messageId: message.id,
                        sharedMessage: message.text
                      })
              }
            >
              <Message
                onPress={isLink ? () => {} : showTime}
                onLongPress={
                  isLink
                    ? () => {}
                    : () =>
                        addIdea({
                          messageId: message.id,
                          sharedMessage: message.text
                        })
                }
                alignment="right"
                groupStyle={groupStyle}
                pl={
                  message.__typename === 'links'
                    ? '2px'
                    : message.text === '❤️'
                    ? '0'
                    : '14px'
                }
                pr={
                  message.__typename === 'links'
                    ? '2px'
                    : message.text === '❤️'
                    ? '0'
                    : '12px'
                }
                py={
                  message.__typename === 'links' || message.text === '❤️'
                    ? '2px'
                    : '8px'
                }
                backgroundColor={
                  message.text === '❤️' ? 'transparent' : '#CE99FF'
                }
                hasReadReceipts={isLatestReadByMessage}
                minWidth={isLink ? '80%' : 0}
              >
                {isLink ? (
                  <>
                    <Link
                      link={message}
                      pollId={pollId}
                      tab="new"
                      setIsLoginModalOpen={() => null}
                      setLinkMenuModal={() => null}
                      setShareLinkModal={() => null}
                      setReminderModal={() => null}
                      isPublic={false}
                      userAgent={userAgent}
                      currentUser={currentUser}
                      isInChat={true}
                      groupStyle={groupStyle}
                    />
                    <Box pb={1} />
                  </>
                ) : (
                  <>
                    {message.text === '❤️' ? (
                      <Box mt={1}>
                        <Icon name="liked" size={28} />
                      </Box>
                    ) : (
                      <ParsedText
                        style={{
                          fontSize: 15,
                          lineHeight: 23,
                          color: 'white'
                        }}
                        parse={[
                          {
                            type: 'url',
                            style: { textDecorationLine: 'underline' },
                            onPress: onUrlPress
                          }
                        ]}
                        childrenProps={{
                          allowFontScaling: false,
                          userSelect: 'text !important'
                        }}
                      >
                        {message.text}
                      </ParsedText>
                    )}
                  </>
                )}

                {isLatestReadByMessage && (
                  <Abs
                    display="flex"
                    flexDirection="row"
                    bottom="-18px"
                    right="-14px"
                  >
                    {message.recipients.map((recipient) => {
                      if (
                        messageReadReceipts.find(
                          (readReceipt) =>
                            readReceipt && readReceipt.id === recipient.id
                        )
                      ) {
                        return (
                          <Box
                            ml="2px"
                            key={`${recipient?.user.id}-${recipient.id}`}
                          >
                            <UserAvatar size="small" user={recipient?.user} />
                          </Box>
                        );
                      }
                    })}
                  </Abs>
                )}
              </Message>

              {!isLatestReadByMessage && (
                <OnboardingLongPress
                  t={t}
                  isVeryLastMessage={isVeryLastMessage}
                  message={message}
                  groupStyle={groupStyle}
                  type={type}
                />
              )}
            </TouchableOpacity>
          </Box>
        );
      }

      if (hasAttachment && !isLink) {
        return (
          <Box key={`${message.id}-${message.created_at}`} mb={16}>
            {(groupStyle === 'leftBottom' || groupStyle === 'leftSingle') && (
              <Abs bottom={'-10px'} left={'-12px'} zIndex={1}>
                <UserAvatar
                  user={message.user}
                  key={`${message.user.id}-${message.id}`}
                  showOnlineMark
                />
              </Abs>
            )}

            <Gallery
              messageId={message.id}
              attachments={message.attachments}
              alignment="left"
              groupStyle={groupStyle}
              addIdea={addIdea}
            />
          </Box>
        );
      }

      // Message others
      const isBlocked = currentUser?.blocking?.find(
        (blockedUser) => blockedUser.user_id === message.user.id
      );

      if (isBlocked) {
        return (
          <Box key={`${message.id}-${message.created_at}`}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
              <Message
                onPress={() => {}}
                alignment="left"
                groupStyle={groupStyle}
                key={`${message.id}-${message.created_at}`}
                pr={'12px'}
                pl={'12px'}
                py={'8px'}
                backgroundColor={'rgba(206, 153, 255, 0.42)'}
              >
                <ParsedText
                  style={{
                    fontSize: 15,
                    lineHeight: 23
                  }}
                  parse={[
                    {
                      type: 'url',
                      style: { textDecorationLine: 'underline' },
                      onPress: onUrlPress
                    }
                  ]}
                  childrenProps={{
                    allowFontScaling: false,
                    userSelect: 'text !important'
                  }}
                >
                  {type === 'comment'
                    ? t('blocked.comment')
                    : t('blocked.message')}
                </ParsedText>
              </Message>
            </TouchableOpacity>
          </Box>
        );
      }

      return (
        <Box key={`${message.id}-${message.created_at}`}>
          {shouldshowTimes && (
            <MessageDateTime createdAt={message.created_at} />
          )}

          <TouchableOpacity
            pointerEvents="box-none"
            activeOpacity={isLink ? 1 : 0.9}
            onPress={isLink ? () => {} : showTime}
            onLongPress={
              isLink
                ? () => {}
                : () =>
                    addIdea({
                      messageId: message.id,
                      sharedMessage: message.text
                    })
            }
          >
            <Message
              onPress={isLink ? () => {} : showTime}
              onLongPress={
                isLink
                  ? () => {
                      // TODO: open menu
                    }
                  : () =>
                      addIdea({
                        messageId: message.id,
                        sharedMessage: message.text
                      })
              }
              alignment="left"
              groupStyle={groupStyle}
              pr={
                message.__typename === 'links'
                  ? '2px'
                  : message.text === '❤️' &&
                    (groupStyle === 'leftBottom' || groupStyle === 'leftSingle')
                  ? '4px'
                  : message.text === '❤️'
                  ? '0'
                  : '12px'
              }
              pl={
                message.__typename === 'links'
                  ? '2px'
                  : message.text === '❤️' &&
                    (groupStyle === 'leftBottom' || groupStyle === 'leftSingle')
                  ? '8px'
                  : message.text === '❤️'
                  ? '0'
                  : '12px'
              }
              py={
                message.__typename === 'links' || message.text === '❤️'
                  ? '2px'
                  : '8px'
              }
              backgroundColor={
                message.text === '❤️'
                  ? 'transparent'
                  : 'rgba(206, 153, 255, 0.42)'
              }
              minWidth={isLink ? '80%' : 0}
            >
              {(groupStyle === 'leftBottom' || groupStyle === 'leftSingle') && (
                <Abs bottom={'-10px'} left={'-12px'} zIndex={1}>
                  <UserAvatar
                    user={message.user}
                    key={`${message.user.id}-${message.id}`}
                    showOnlineMark
                  />
                </Abs>
              )}

              {isLink ? (
                <>
                  <Link
                    link={message}
                    pollId={pollId}
                    tab="new"
                    setIsLoginModalOpen={() => null}
                    setLinkMenuModal={() => null}
                    setShareLinkModal={() => null}
                    setReminderModal={() => null}
                    isPublic={false}
                    userAgent={userAgent}
                    currentUser={currentUser}
                    isInChat={true}
                    groupStyle={groupStyle}
                  />

                  <Box pb={1} />
                </>
              ) : (
                <>
                  {message.text === '❤️' ? (
                    <Box mt={1}>
                      <Icon name="liked" size={28} />
                    </Box>
                  ) : (
                    <ParsedText
                      style={{
                        fontSize: 15,
                        lineHeight: 23
                      }}
                      parse={[
                        {
                          type: 'url',
                          style: { textDecorationLine: 'underline' },
                          onPress: onUrlPress
                        }
                      ]}
                      childrenProps={{
                        allowFontScaling: false,
                        userSelect: 'text !important'
                      }}
                    >
                      {message.text}
                    </ParsedText>
                  )}
                </>
              )}
            </Message>
          </TouchableOpacity>
        </Box>
      );
    },
    [groupStyles]
  );

  if (isLoading && !messages) {
    return (
      <Flex
        height={height - top - bottom}
        top={0}
        right={0}
        bottom={0}
        left={0}
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator delayed={true} />
      </Flex>
    );
  }

  if (!messages) return null;

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    setScrollYOffset(yOffset);
  };

  const onUrlPress = (url: string) => {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      onUrlPress(`http://${url}`);
    } else {
      WebBrowser.openBrowserAsync(url, {
        enableBarCollapsing: true,
        dismissButtonStyle: 'close',
        enableDefaultShare: true
      });
    }
  };

  return (
    <Box
      collapsable={false}
      style={{ flex: 1, alignItems: 'center', width: '100%' }}
    >
      {loadingMore && <ActivityIndicator delayed={false} />}

      <List
        ref={flatListRef}
        data={[...messages]}
        extraData={refresh}
        onEndReached={() => {
          if (loadingMore) return;

          fetchMore({
            variables: {
              offset: messages.length
            }
          }).then(() => {
            setOffset(messages.length);
          });
        }}
        inverted={messages.length !== 0}
        keyboardShouldPersistTaps="always"
        keyExtractor={(message) => `${message.id}`}
        renderItem={({ item: message }) => renderItem(message)}
        ListEmptyComponent={
          <>
            {type === 'message' && (
              <Onboarding setShareModal={setShareModal} userAgent={userAgent} />
            )}
          </>
        }
        onEndReachedThreshold={1}
        initialNumToRender={15}
        onScroll={handleScroll}
        onContentSizeChange={(contentWidth: number, contentHeight: number) => {
          setContentHeight(contentHeight);
        }}
        refreshing={false}
        height={height}
        contentHeight={contentHeight}
        top={top}
        bottom={bottom}
      />
    </Box>
  );
}

export default React.memo(MessagesList);

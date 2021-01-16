import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  PixelRatio,
  Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gql } from '@apollo/client';

import Icon from '../icon';
import { Box } from '../styles';

import { UserIdContext } from '../user-id-context';
import useCurrentUser from '../../hooks/use-current-user';
import useTranslation from '../../hooks/use-translation';

import {
  useAddCommentMutation,
  useAddCommentAttachmentMutation,
  useAddMessageMutation,
  useAddMessageAttachmentMutation,
  PollFragmentDoc
} from '@pool/app/src/graphql';

import { track } from '../../lib/analytics';

import ImagePickerButton from './image-picker-button';

import { useKeyboardDimensions } from '../../hooks/use-keyboard-dimensions';

const MessageBox = styled(Box)`
  flex: 1;
  backface-visibility: hidden;
  background-color: white;
  height: ${(props) => props.scrollHeight + 20}px;
  width: 100%;
  background-color: white;
  z-index: 1;

  ${Platform.select({
    ios: `
      position: absolute;
    `,
    android: `
      position: absolute;
    `,
    web: `
      position: fixed;
      max-width: 696px;
      margin: 0 auto;
    `
  })}
`;

export const Wrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-shrink: 0;
  padding: 5px;

  ${Platform.select({
    web: `
      overflow-wrap: break-word;
    `
  })}
`;

export const WrapperTextArea = styled(View)`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 18px;
`;

export const TextArea = styled(TextInput)`
  font-family: Arial Rounded MT Std;
  width: 100%;
  height: ${(props) => props.scrollHeight}px;
  border: none;
  padding-top: 12px;
  padding-bottom: 10px;
  font-size: 15px;
  line-height: 18px;

  ${Platform.select({
    web: `
      resize: none;
      outline-style: none;
    `
  })};
`;

const SendButton = styled(TouchableOpacity)`
  border: none;
  min-width: 45px;
  width: 45px;
  height: 33px;
  padding-left: 10px;
  background-color: transparent;
  align-self: flex-end;

  svg {
    margin-left: -3px;
  }

  ${Platform.select({
    web: `
      outline-style: none;
      cursor: pointer;
    `
  })}
`;

interface AddMessageProps {
  pollId: string;
  linkId: string;
  scrollToBottom: () => void;
  userAgent: string;
  type: 'comment' | 'message';
  onFocus: () => void;
  onBlur: () => void;
  onFocusOut: () => void;
  inputRef: any;
  scrollHeight: number;
  setScrollHeight: (height: number) => void;
  isKeyboardOpen: boolean;
  positionY: number;
}

function AddMessage({
  pollId,
  linkId,
  scrollToBottom,
  userAgent,
  type,
  onFocus,
  onBlur,
  onFocusOut,
  inputRef,
  scrollHeight,
  setScrollHeight,
  isKeyboardOpen,
  positionY
}: AddMessageProps) {
  const { t } = useTranslation();
  const userId = useContext(UserIdContext);
  const currentUser = useCurrentUser();
  const insets = useSafeAreaInsets();
  const [addComment] = useAddCommentMutation();
  const [addCommentAttachment] = useAddCommentAttachmentMutation();
  const [addMessage] = useAddMessageMutation();
  const [addMessageAttachment] = useAddMessageAttachmentMutation();

  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const inputContainerRef = useRef(null);

  const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(userAgent);
  const fuckingKeyboard = isSafari;
  const isMobile =
    userAgent.includes('PoolApp') ||
    /android/i.test(userAgent) ||
    /iPad|iPhone|iPod|ios/.test(userAgent);

  useEffect(() => {
    if (fuckingKeyboard) {
      if (inputContainerRef.current) {
        inputContainerRef.current.addEventListener(
          'touchmove',
          (e) => {
            e.preventDefault();
          },
          { passive: false }
        );
      }
    }

    return () => {
      if (fuckingKeyboard) {
        if (inputContainerRef.current) {
          inputContainerRef.current.removeEventListener('touchmove', (e) => {
            e.preventDefault();
          });
        }
      }
    };
  }, [inputContainerRef.current]);

  const useListenersOnAndroid = false;
  const { keyboardEndPositionY, keyboardHeight } = useKeyboardDimensions(
    useListenersOnAndroid
  );

  const deltaY = Animated.subtract(positionY, keyboardEndPositionY).interpolate(
    {
      inputRange: [0, Number.MAX_SAFE_INTEGER],
      outputRange: [0, Number.MAX_SAFE_INTEGER],
      extrapolate: 'clamp'
    }
  );

  let messageBoxBottom = 0;
  if (!isKeyboardOpen) {
    messageBoxBottom = insets.bottom;
  } else if (Platform.OS === 'ios' && isKeyboardOpen) {
    const value = Animated.subtract(
      keyboardHeight > 0 ? keyboardHeight : 0,
      deltaY
    );

    messageBoxBottom = value.__getValue();
  } else if (Platform.OS === 'android' && isKeyboardOpen) {
    messageBoxBottom = PixelRatio.getPixelSizeForLayoutSize(5);
  }

  useEffect(() => {
    if (attachment) {
      submitMessage();
    }
  }, [attachment]);

  const onKeyPress = (event: KeyboardEvent) => {
    if (
      !isMobile &&
      event.nativeEvent.keyCode === 13 &&
      !event.nativeEvent.shiftKey
    ) {
      event.preventDefault();
      if (message && message !== '') {
        submitMessage();
      }
    }
  };

  const onChange = (event: Event) => {
    if (message === '' && event.nativeEvent.inputType === 'insertLineBreak') {
      return;
    }

    setMessage(event.target.value || event.nativeEvent.text);

    if (Platform.OS === 'web') {
      if (event.target.value !== '') {
        if (scrollHeight < 70) {
          setScrollHeight(event.target.scrollHeight);
          scrollToBottom();
        }
      } else {
        setScrollHeight(40);
      }
    }
  };

  const submitMessage = async () => {
    let text = '';
    if (message === '' && !attachment) {
      text = '❤️';
    } else if (!attachment) {
      text = message;
      setMessage('');
      setScrollHeight(40);
    }

    try {
      if (type === 'comment') {
        const { data } = await addComment({
          variables: {
            linkId,
            pollId,
            userId,
            text: text,
            now: new Date().toISOString()
          },
          optimisticResponse: {
            __typename: 'mutation_root',
            insert_comments: {
              __typename: 'comments_mutation_response',
              returning: [
                {
                  __typename: 'comments',
                  id: '-1',
                  text: text,
                  user: {
                    __typename: 'users',
                    ...currentUser
                  },
                  created_at: new Date().toISOString(),
                  recipients: [
                    {
                      __typename: 'recipients',
                      id: '-1',
                      user: {
                        __typename: 'users',
                        id: '-1',
                        first_name: '',
                        last_name: '',
                        picture: '',
                        color: '',
                        last_seen_at: '',
                        locale: ''
                      },
                      received_at: new Date().toISOString(),
                      read_at: null
                    }
                  ],
                  attachments: attachment
                    ? [
                        {
                          __typename: 'comments_attachments',
                          id: '-1',
                          file_id: '-1',
                          type: attachment.type,
                          url: attachment.url
                        }
                      ]
                    : []
                }
              ]
            },
            update_polls: {
              __typename: 'polls_mutation_response',
              affected_rows: 1
            }
          },
          update: (cache, { data: { insert_comments } }) => {
            const data = cache.readFragment({
              id: `links:${linkId}`,
              fragment: gql`
                fragment LinkComments on links {
                  id
                  comments {
                    id
                    text
                  }
                }
              `
            });
            const link = JSON.parse(JSON.stringify(data));

            if (
              link.comments.find(
                (link) => link.id === insert_comments.returning[0].id
              )
            ) {
              return;
            }

            link.comments.unshift(insert_comments.returning[0]);

            cache.writeFragment({
              id: `links:${linkId}`,
              data: link,
              fragment: gql`
                fragment LinkComments on links {
                  id
                  comments {
                    id
                    text
                  }
                }
              `
            });
          }
        });

        if (attachment) {
          await addCommentAttachment({
            variables: {
              userId,
              fileId: attachment.id,
              commentId: data.insert_comments.returning[0].id,
              type: attachment.type,
              url: attachment.url
            }
          });

          setAttachment(null);
        }

        track('Comment Added');
      } else if (type === 'message') {
        const { data } = await addMessage({
          variables: {
            pollId,
            userId,
            text: text,
            now: new Date().toISOString()
          },
          optimisticResponse: {
            __typename: 'mutation_root',
            insert_messages: {
              __typename: 'messages_mutation_response',
              returning: [
                {
                  __typename: 'messages',
                  id: '-1',
                  text: text,
                  user: {
                    __typename: 'users',
                    ...currentUser
                  },
                  created_at: new Date().toISOString(),
                  recipients: [
                    {
                      __typename: 'messages_recipients',
                      id: '-1',
                      user: {
                        __typename: 'users',
                        id: '-1',
                        first_name: '',
                        last_name: '',
                        picture: '',
                        color: '',
                        last_seen_at: '',
                        locale: ''
                      },
                      received_at: new Date().toISOString(),
                      read_at: null
                    }
                  ],
                  attachments: attachment
                    ? [
                        {
                          __typename: 'messages_attachments',
                          id: '-1',
                          file_id: '-1',
                          type: attachment.type,
                          url: attachment.url
                        }
                      ]
                    : []
                }
              ]
            },
            update_polls: {
              __typename: 'polls_mutation_response',
              affected_rows: 1
            }
          },
          update: (cache, { data: { insert_messages } }) => {
            const data = cache.readFragment({
              id: `polls:${pollId}`,
              fragment: PollFragmentDoc,
              fragmentName: 'Poll'
            });

            const poll = JSON.parse(JSON.stringify(data));

            if (
              poll?.messages_and_links?.find(
                (item) => item.message?.id === insert_messages.returning[0].id
              )
            ) {
              return;
            }

            const newMessage = {
              type: 'message',
              messages: insert_messages.returning[0]
            };

            poll?.messages_and_links?.unshift(newMessage);

            cache.writeFragment({
              id: `polls:${pollId}`,
              fragment: PollFragmentDoc,
              fragmentName: 'Poll',
              data: poll
            });
          }
        });

        if (attachment) {
          await addMessageAttachment({
            variables: {
              userId,
              fileId: attachment.id,
              messageId: data.insert_messages.returning[0].id,
              type: attachment.type,
              url: attachment.url
            }
          });

          setAttachment(null);
        }

        track('Message Added');
      }

      scrollToBottom();
    } catch (e) {
      console.error(e);
      if (!attachment) {
        setMessage(text === '❤️' ? '' : text);
      }
    }
  };

  return (
    <MessageBox
      ref={inputContainerRef}
      pt="5px"
      scrollHeight={scrollHeight}
      right={0}
      left={0}
      bottom={`${messageBoxBottom}px`}
      style={{
        ...Platform.select({
          web: {
            transform: 'translate3d(0, 0, 0)'
          }
        })
      }}
    >
      <Wrapper>
        {/* {Platform.OS !== 'web' && (
          <CameraButton setIsCameraOpen={setIsCameraOpen} />
        )} */}

        <ImagePickerButton
          id={type === 'comment' ? linkId : pollId}
          type={type}
          setAttachment={setAttachment}
        />

        <WrapperTextArea>
          <TextArea
            ref={inputRef}
            placeholder={
              type === 'comment'
                ? t('comments.addComment')
                : t('messages.addMessage')
            }
            multiline={true}
            value={message}
            onChange={onChange}
            onKeyPress={onKeyPress}
            scrollHeight={scrollHeight}
            onFocus={() => {
              if (onFocus) onFocus();
            }}
            onBlur={() => {
              if (onBlur) onBlur();
            }}
            onFocusOut={() => {
              if (onFocusOut) onFocusOut();
            }}
            onSubmitEditing={() => {
              if (message && message !== '') {
                submitMessage();
              }
              if (onBlur) onBlur();
            }}
            onContentSizeChange={({ nativeEvent }) => {
              if (Platform.OS !== 'web') {
                setScrollHeight(22 + nativeEvent.contentSize.height);
              }
            }}
            blurOnSubmit={true}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            numberOfLines={1}
            textAlign="left"
          />
        </WrapperTextArea>

        <SendButton type="button" onPress={submitMessage} zIndex={1}>
          {message === '' ? (
            <Icon type="submit" name="liked" size={28} />
          ) : (
            <Icon type="submit" name="send" size={28} />
          )}
        </SendButton>
      </Wrapper>
    </MessageBox>
  );
}

export default React.memo(AddMessage);

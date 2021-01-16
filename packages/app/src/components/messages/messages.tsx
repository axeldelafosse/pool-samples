import React, { useState, useRef, useEffect } from 'react';
import { Platform, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSubscription, NetworkStatus } from '@apollo/client';
import { useRouter } from 'next/router';

import MessagesList from '@pool/app/src/components/messages/messages-list';
import AddMessage from '@pool/app/src/components/messages/add-message';
import { send, Event } from '@pool/app/src/modules/gg';

import { Box } from '@pool/app/src/components/styles';

import CloseButton from '@pool/app/src/components/close-button';
import PoolCamera from '@pool/app/src/components/camera';

import HeaderModal from '@pool/app/src/components/header-modal';

import { usePanResponder } from '@pool/app/src/hooks/use-pan-responder';

import {
  useGetCommentsForLinkIdLazyQuery,
  useGetMessagesAndLinksForPollIdLazyQuery,
  GetCommentsForLinkIdSubDocument,
  GetMessagesAndLinksForPollIdSubDocument,
  PollFragment
} from '@pool/app/src/graphql';

interface MessagesProps {
  poll: PollFragment;
  pollId?: string;
  linkId?: string;
  onRequestClose: () => void;
  userAgent: string;
  type: 'comment' | 'message';
  setAddLinkModal: any;
  setShareModal: () => void;
}

function Messages({
  poll,
  pollId,
  linkId,
  onRequestClose,
  userAgent,
  type,
  setAddLinkModal,
  setShareModal
}: MessagesProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(40);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [offset, setOffset] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  const isPublic = poll.type === 'public' || poll.parent?.type === 'public';
  const [
    loadComments,
    {
      called: calledComments,
      data: dataLink,
      fetchMore: fetchMoreComments,
      networkStatus: networkStatusComments,
      loading: loadingComments
    }
  ] = useGetCommentsForLinkIdLazyQuery({
    variables: {
      id: linkId,
      offset: 0,
      limit: 15 + offset
    },
    notifyOnNetworkStatusChange: true,
    returnPartialData: true
  });
  const [
    loadMessages,
    {
      called: calledMessages,
      data: dataPoll,
      fetchMore: fetchMoreMessages,
      networkStatus: networkStatusMessages,
      loading: loadingMessages
    }
  ] = useGetMessagesAndLinksForPollIdLazyQuery({
    variables: {
      id: pollId || poll.id,
      offset: 0,
      limit: 15 + offset
    },
    notifyOnNetworkStatusChange: true,
    returnPartialData: true
  });

  const isLoading = loadingComments || loadingMessages;
  const loadingMore =
    networkStatusComments === NetworkStatus.fetchMore ||
    networkStatusMessages === NetworkStatus.fetchMore;

  const isIOSApp = userAgent.includes('PoolApp/ios');
  const isMobile =
    userAgent.includes('PoolApp') ||
    /android/i.test(userAgent) ||
    /iPad|iPhone|iPod|ios/.test(userAgent);

  let title = '';
  let messages = [];
  if (type === 'comment') {
    if (!calledComments) loadComments();
    useSubscription(GetCommentsForLinkIdSubDocument, {
      variables: {
        id: linkId,
        offset: 0,
        limit: 15 + offset
      }
    });

    const link = dataLink?.link?.[0];
    title = link?.name && link?.name !== '' ? link.name : link?.title;
    if (!title && !isLoading) title = '🖼';
    messages = link?.comments;
  } else if (type === 'message') {
    if (!calledMessages) loadMessages();
    useSubscription(GetMessagesAndLinksForPollIdSubDocument, {
      variables: {
        id: pollId || poll.id,
        offset: 0,
        limit: 15 + offset
      }
    });

    title = poll.name || dataPoll?.poll?.name;
    messages = dataPoll?.poll?.messages_and_links
      ?.map((item) => (item.type === 'link' ? item.links : item.messages))
      .reduce((acc, val) => acc.concat(val), []);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);

    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
    };
  }, []);

  const _keyboardWillShow = (e) => {
    const height = e.endCoordinates.height;

    setKeyboardHeight(height);
  };

  const scrollToBottom = () => {
    if (!flatListRef.current || messages.length === 0) return;

    flatListRef.current.scrollToOffset({
      offset: 0,
      animated: true
    });
  };

  const { panHandlers, positionY } = usePanResponder();
  const [contentBottomInset, setContentBottomInset] = useState(0);
  const addMessageBoxHeight = scrollHeight + 20;

  let messagesListBottom = 0;
  if (!isKeyboardOpen && Platform.OS === 'web') {
    messagesListBottom = insets.bottom + addMessageBoxHeight;
  } else if (!isKeyboardOpen && Platform.OS !== 'web') {
    // For mobile apps
    messagesListBottom = insets.bottom
      ? insets.bottom + addMessageBoxHeight
      : addMessageBoxHeight;
  } else if (Platform.OS === 'ios' && isKeyboardOpen) {
    messagesListBottom = keyboardHeight + addMessageBoxHeight;
  } else {
    messagesListBottom = addMessageBoxHeight;
  }

  return (
    <Box flex={1}>
      {isCameraOpen && <PoolCamera setIsCameraOpen={setIsCameraOpen} />}

      {type === 'comment' && (
        <>
          <HeaderModal title={title} />
          <CloseButton
            onPress={() => {
              send(Event.TripleHaptics);
              if (Platform.OS === 'web') {
                router.back();
              } else {
                onRequestClose();
              }
            }}
          />
        </>
      )}

      <MessagesList
        pollId={pollId || poll.id}
        messages={messages}
        type={type}
        userAgent={userAgent}
        scrollToBottom={scrollToBottom}
        fetchMore={type === 'comment' ? fetchMoreComments : fetchMoreMessages}
        isLoading={isLoading}
        loadingMore={loadingMore}
        flatListRef={flatListRef}
        inputRef={inputRef}
        top={type === 'comment' ? 60 : 0}
        bottom={messagesListBottom}
        setShareModal={setShareModal}
        setAddLinkModal={setAddLinkModal}
        setOffset={setOffset}
      />

      <AddMessage
        inputRef={inputRef}
        pollId={pollId || poll.id}
        linkId={linkId}
        userAgent={userAgent}
        isPublic={isPublic}
        type={type}
        onFocus={() => {
          setIsKeyboardOpen(true);
        }}
        onBlur={() => {
          if (Platform.OS === 'web' && isMobile && !setAddLinkModal?.isOpen) {
            inputRef.current.focus();
          } else {
            setIsKeyboardOpen(false);
          }
          scrollToBottom();
        }}
        scrollToBottom={scrollToBottom}
        scrollHeight={scrollHeight}
        setScrollHeight={setScrollHeight}
        setIsCameraOpen={setIsCameraOpen}
        isKeyboardOpen={isKeyboardOpen}
        setContentBottomInset={setContentBottomInset}
        positionY={positionY}
      />
    </Box>
  );
}

export default Messages;

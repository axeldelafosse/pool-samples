import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Modal from '../modal';
import Messages from '@pool/app/src/components/messages/messages';

import { PollFragment } from '@pool/app/graphql';

interface MessagesModalProps {
  poll: PollFragment;
  pollId?: string;
  linkId?: string;
  tab?: string;
  active: boolean;
  userAgent: string;
  type: 'comment' | 'message';
  onRequestClose: () => void;
  setAddLinkModal: () => void;
  setShareModal: () => void;
}

function MessagesModal({
  poll,
  pollId,
  linkId,
  active,
  onRequestClose,
  userAgent,
  type,
  setAddLinkModal,
  setShareModal
}: MessagesModalProps) {
  const insets = useSafeAreaInsets();

  if (type === 'comment' && !linkId) return null;
  if (type === 'message' && !poll?.id) return null;

  return (
    <>
      <Modal
        active={active}
        onRequestClose={onRequestClose}
        height={[`calc(100% - 58px - ${insets.top}px) !important`, `100%`]}
        style={{
          minHeight: 350,
          top: 'unset',
          borderTopLeftRadius: '23px',
          borderTopRightRadius: '23px'
        }}
        wrapperStyle={{
          borderTopLeftRadius: '23px',
          borderTopRightRadius: '23px'
        }}
        isNotFullHeight={true}
      >
        <Messages
          poll={poll}
          pollId={pollId}
          linkId={linkId}
          onRequestClose={onRequestClose}
          userAgent={userAgent}
          type={type}
          setAddLinkModal={setAddLinkModal}
          setShareModal={setShareModal}
        />
      </Modal>
    </>
  );
}

export default MessagesModal;

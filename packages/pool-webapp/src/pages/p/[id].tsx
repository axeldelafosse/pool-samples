import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { ApolloProvider } from '@apollo/client';

import { getToken } from '@/utils/token';
import initApollo, { useApollo } from '@/lib/init-apollo';

import { LoginModalProvider } from '@/components/login-modal-context';
import { AddLinkModalProvider } from '@/components/add-link-modal-context';
import { CreatePollModalProvider } from '@/components/create-poll-modal-context';

import { Flex, Wrapper } from '@/components/styles-web';
import Menu from '@/components/menu';
import Poll from '@/components/poll';

import { UserIdProvider } from '@pool/app/src/components/user-id-context';
import { LocaleProvider } from '@pool/app/src/components/locale-context';
import getLanguage from '@pool/app/src/modules/translations/get-language';

import CreatePollModal from '@/components/poll/add-poll-modal';

import Identify from '@/components/identify';

import {
  GetPublicPollsDocument,
  GetPublicSubpollsDocument,
  GetPollByIdDocument
} from '@pool/app/src/graphql';

interface PollContainerProps {
  id: string;
  initialState: any;
}

const PollContainer = ({ id, initialState }: PollContainerProps) => {
  const jwt = getToken();
  const router = useRouter();
  const decoded = jwt ? jwtDecode<{ id: string | null }>(jwt) : { id: null };
  const userId = decoded.id;
  const language = getLanguage();
  const apolloClient = useApollo({ initialState, jwt });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreatePollModalOpen, setIsCreatePollModalOpen] = useState(false);
  const [addLinkModal, setAddLinkModal] = useState({ isOpen: false });

  const [userAgent, setUserAgent] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const userAgent = window?.navigator?.userAgent;
    setUserAgent(userAgent);
    setIsMobile(
      userAgent.includes('PoolApp') ||
        /android/i.test(userAgent) ||
        /iPad|iPhone|iPod|ios/.test(userAgent)
    );
  });

  useEffect(() => {
    const element = document.getElementById('PapercupsChatWidget');
    element?.parentNode?.removeChild(element);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <UserIdProvider value={userId}>
        <LocaleProvider lang={language}>
          <LoginModalProvider value={setIsLoginModalOpen}>
            <AddLinkModalProvider value={setAddLinkModal}>
              <CreatePollModalProvider value={setIsCreatePollModalOpen}>
                <Flex height="100vh">
                  {userAgent !== '' && !isMobile && userId && (
                    <Menu
                      userAgent={userAgent}
                      isCreatePollModalOpen={isCreatePollModalOpen}
                    />
                  )}
                  <Wrapper>
                    <Poll
                      id={
                        router?.query?.id && id !== router?.query?.id
                          ? router.query.id
                          : id
                      }
                      userAgent={userAgent}
                      isLoginModalOpen={isLoginModalOpen}
                      addLinkModal={addLinkModal}
                      style={{
                        overflowY: 'auto'
                      }}
                    />
                  </Wrapper>
                  {userAgent !== '' && !isMobile && userId && (
                    <CreatePollModal
                      userId={userId}
                      userAgent={userAgent}
                      active={isCreatePollModalOpen}
                      onRequestClose={() => setIsCreatePollModalOpen(false)}
                    />
                  )}
                </Flex>
              </CreatePollModalProvider>
            </AddLinkModalProvider>
          </LoginModalProvider>
        </LocaleProvider>
        <Identify />
      </UserIdProvider>
    </ApolloProvider>
  );
};

export async function getStaticPaths() {
  const apolloClient = initApollo();
  const { data: dataPolls } = await apolloClient.query({
    query: GetPublicPollsDocument
  });
  const { data: dataSubpolls } = await apolloClient.query({
    query: GetPublicSubpollsDocument
  });

  const pathsPolls = dataPolls.polls.map((poll) => ({
    params: { id: poll.id }
  }));
  const pathsSubpolls = dataSubpolls.polls.map((poll) => ({
    params: { id: poll.id }
  }));

  return {
    paths: [...pathsPolls, ...pathsSubpolls],
    fallback: true
  };
}

export async function getStaticProps(ctx) {
  const id = ctx.params.id;

  if (
    id &&
    !id.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    )
  ) {
    return {
      notFound: true
    };
  }

  const apolloClient = initApollo();
  await apolloClient.query({
    query: GetPollByIdDocument,
    variables: {
      id,
      offset: 0,
      limit: 12
    }
  });

  return {
    props: {
      id,
      initialState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
}

export default PollContainer;

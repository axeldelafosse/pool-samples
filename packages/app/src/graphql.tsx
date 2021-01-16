import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export const UserFragmentDoc = gql`
    fragment User on users {
  id
  first_name
  last_name
  picture
  color
  last_seen_at
  locale
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on users {
  ...User
  email
  premium
  blocking: blocked_users {
    id
    user_id
  }
}
    ${UserFragmentDoc}`;
export const RecipientsFragmentDoc = gql`
    fragment Recipients on recipients {
  id
  user {
    ...User
  }
  received_at
  read_at
}
    ${UserFragmentDoc}`;
export const CommentAttachmentsFragmentDoc = gql`
    fragment CommentAttachments on comments_attachments {
  id
  file_id
  type
  url
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on comments {
  id
  text
  user {
    ...User
  }
  created_at
  recipients {
    ...Recipients
  }
  attachments: comments_attachments {
    ...CommentAttachments
  }
}
    ${UserFragmentDoc}
${RecipientsFragmentDoc}
${CommentAttachmentsFragmentDoc}`;
export const LinkRecipientsFragmentDoc = gql`
    fragment LinkRecipients on links_recipients {
  id
  user {
    ...User
  }
  received_at
  read_at
}
    ${UserFragmentDoc}`;
export const LinkAttachmentsFragmentDoc = gql`
    fragment LinkAttachments on links_attachments {
  id
  file_id
  type
  url
}
    `;
export const LinkFragmentDoc = gql`
    fragment Link on links {
  id
  url
  title
  description
  image
  note
  name
  upvotes(order_by: {created_at: asc}) {
    id
    user {
      ...User
    }
    created_at
  }
  upvotes_aggregate {
    aggregate {
      count
    }
  }
  comments(limit: 1, order_by: {created_at: desc}) {
    id
    recipients(order_by: {received_at: desc}) {
      id
      user {
        id
      }
      read_at
    }
  }
  comments_aggregate {
    aggregate {
      count
    }
  }
  user {
    ...User
  }
  created_at
  happened_at
  recipients: links_recipients {
    ...LinkRecipients
  }
  attachments: links_attachments(limit: 1, order_by: {created_at: desc}) {
    ...LinkAttachments
  }
}
    ${UserFragmentDoc}
${LinkRecipientsFragmentDoc}
${LinkAttachmentsFragmentDoc}`;
export const MessageRecipientsFragmentDoc = gql`
    fragment MessageRecipients on messages_recipients {
  id
  user {
    ...User
  }
  received_at
  read_at
}
    ${UserFragmentDoc}`;
export const MessageAttachmentsFragmentDoc = gql`
    fragment MessageAttachments on messages_attachments {
  id
  file_id
  type
  url
}
    `;
export const MessageFragmentDoc = gql`
    fragment Message on messages {
  id
  text
  user {
    ...User
  }
  created_at
  recipients: messages_recipients {
    ...MessageRecipients
  }
  attachments: messages_attachments {
    ...MessageAttachments
  }
}
    ${UserFragmentDoc}
${MessageRecipientsFragmentDoc}
${MessageAttachmentsFragmentDoc}`;
export const PollFragmentDoc = gql`
    fragment Poll on polls {
  id
  name
  messages_and_links {
    type
    links {
      ...Link
    }
    messages @connection(key: "messages") {
      ...Message
    }
  }
}
    ${LinkFragmentDoc}
${MessageFragmentDoc}`;
export const AddCommentAttachmentDocument = gql`
    mutation AddCommentAttachment($userId: uuid!, $fileId: uuid!, $commentId: uuid!, $type: String!, $url: String!) {
  insert_comments_attachments(objects: {posted_by: $userId, file_id: $fileId, comment_id: $commentId, type: $type, url: $url}) {
    returning {
      id
    }
  }
}
    `;
export type AddCommentAttachmentMutationFn = Apollo.MutationFunction<AddCommentAttachmentMutation, AddCommentAttachmentMutationVariables>;

/**
 * __useAddCommentAttachmentMutation__
 *
 * To run a mutation, you first call `useAddCommentAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentAttachmentMutation, { data, loading, error }] = useAddCommentAttachmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      fileId: // value for 'fileId'
 *      commentId: // value for 'commentId'
 *      type: // value for 'type'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAddCommentAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentAttachmentMutation, AddCommentAttachmentMutationVariables>) {
        return Apollo.useMutation<AddCommentAttachmentMutation, AddCommentAttachmentMutationVariables>(AddCommentAttachmentDocument, baseOptions);
      }
export type AddCommentAttachmentMutationHookResult = ReturnType<typeof useAddCommentAttachmentMutation>;
export type AddCommentAttachmentMutationResult = Apollo.MutationResult<AddCommentAttachmentMutation>;
export type AddCommentAttachmentMutationOptions = Apollo.BaseMutationOptions<AddCommentAttachmentMutation, AddCommentAttachmentMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($linkId: uuid!, $pollId: uuid!, $userId: uuid!, $text: String!, $now: timestamptz!) {
  insert_comments(objects: {link_id: $linkId, posted_by: $userId, text: $text}) {
    returning {
      ...Comment
    }
  }
  update_links(where: {id: {_eq: $linkId}}, _set: {updated_at: $now}) {
    affected_rows
  }
  update_polls(where: {id: {_eq: $pollId}}, _set: {updated_at: $now}) {
    affected_rows
  }
}
    ${CommentFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      pollId: // value for 'pollId'
 *      userId: // value for 'userId'
 *      text: // value for 'text'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddLinkAttachmentDocument = gql`
    mutation AddLinkAttachment($userId: uuid!, $fileId: uuid!, $linkId: uuid!, $type: String!, $url: String!, $now: timestamptz!) {
  insert_links_attachments(objects: {posted_by: $userId, file_id: $fileId, link_id: $linkId, type: $type, url: $url}) {
    returning {
      id
    }
  }
  update_links(where: {id: {_eq: $linkId}}, _set: {updated_at: $now}) {
    affected_rows
  }
}
    `;
export type AddLinkAttachmentMutationFn = Apollo.MutationFunction<AddLinkAttachmentMutation, AddLinkAttachmentMutationVariables>;

/**
 * __useAddLinkAttachmentMutation__
 *
 * To run a mutation, you first call `useAddLinkAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLinkAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLinkAttachmentMutation, { data, loading, error }] = useAddLinkAttachmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      fileId: // value for 'fileId'
 *      linkId: // value for 'linkId'
 *      type: // value for 'type'
 *      url: // value for 'url'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useAddLinkAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<AddLinkAttachmentMutation, AddLinkAttachmentMutationVariables>) {
        return Apollo.useMutation<AddLinkAttachmentMutation, AddLinkAttachmentMutationVariables>(AddLinkAttachmentDocument, baseOptions);
      }
export type AddLinkAttachmentMutationHookResult = ReturnType<typeof useAddLinkAttachmentMutation>;
export type AddLinkAttachmentMutationResult = Apollo.MutationResult<AddLinkAttachmentMutation>;
export type AddLinkAttachmentMutationOptions = Apollo.BaseMutationOptions<AddLinkAttachmentMutation, AddLinkAttachmentMutationVariables>;
export const AddLinkToPollDocument = gql`
    mutation AddLinkToPoll($linkId: uuid!, $pollId: uuid!, $now: timestamptz!) {
  result: insert_links_polls(objects: {link_id: $linkId, poll_id: $pollId}) {
    linkInPoll: returning {
      id
    }
  }
  update_polls(where: {id: {_eq: $pollId}}, _set: {updated_at: $now}) {
    affected_rows
  }
}
    `;
export type AddLinkToPollMutationFn = Apollo.MutationFunction<AddLinkToPollMutation, AddLinkToPollMutationVariables>;

/**
 * __useAddLinkToPollMutation__
 *
 * To run a mutation, you first call `useAddLinkToPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLinkToPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLinkToPollMutation, { data, loading, error }] = useAddLinkToPollMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      pollId: // value for 'pollId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useAddLinkToPollMutation(baseOptions?: Apollo.MutationHookOptions<AddLinkToPollMutation, AddLinkToPollMutationVariables>) {
        return Apollo.useMutation<AddLinkToPollMutation, AddLinkToPollMutationVariables>(AddLinkToPollDocument, baseOptions);
      }
export type AddLinkToPollMutationHookResult = ReturnType<typeof useAddLinkToPollMutation>;
export type AddLinkToPollMutationResult = Apollo.MutationResult<AddLinkToPollMutation>;
export type AddLinkToPollMutationOptions = Apollo.BaseMutationOptions<AddLinkToPollMutation, AddLinkToPollMutationVariables>;
export const AddLinkDocument = gql`
    mutation AddLink($userId: uuid!, $url: String, $note: String, $name: String) {
  result: insert_links(objects: {posted_by: $userId, url: $url, note: $note, name: $name}) {
    link: returning {
      ...Link
    }
  }
}
    ${LinkFragmentDoc}`;
export type AddLinkMutationFn = Apollo.MutationFunction<AddLinkMutation, AddLinkMutationVariables>;

/**
 * __useAddLinkMutation__
 *
 * To run a mutation, you first call `useAddLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLinkMutation, { data, loading, error }] = useAddLinkMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      url: // value for 'url'
 *      note: // value for 'note'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddLinkMutation(baseOptions?: Apollo.MutationHookOptions<AddLinkMutation, AddLinkMutationVariables>) {
        return Apollo.useMutation<AddLinkMutation, AddLinkMutationVariables>(AddLinkDocument, baseOptions);
      }
export type AddLinkMutationHookResult = ReturnType<typeof useAddLinkMutation>;
export type AddLinkMutationResult = Apollo.MutationResult<AddLinkMutation>;
export type AddLinkMutationOptions = Apollo.BaseMutationOptions<AddLinkMutation, AddLinkMutationVariables>;
export const AddMessageAttachmentDocument = gql`
    mutation AddMessageAttachment($userId: uuid!, $fileId: uuid!, $messageId: uuid!, $type: String!, $url: String!) {
  insert_messages_attachments(objects: {posted_by: $userId, file_id: $fileId, message_id: $messageId, type: $type, url: $url}) {
    returning {
      id
    }
  }
}
    `;
export type AddMessageAttachmentMutationFn = Apollo.MutationFunction<AddMessageAttachmentMutation, AddMessageAttachmentMutationVariables>;

/**
 * __useAddMessageAttachmentMutation__
 *
 * To run a mutation, you first call `useAddMessageAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageAttachmentMutation, { data, loading, error }] = useAddMessageAttachmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      fileId: // value for 'fileId'
 *      messageId: // value for 'messageId'
 *      type: // value for 'type'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAddMessageAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageAttachmentMutation, AddMessageAttachmentMutationVariables>) {
        return Apollo.useMutation<AddMessageAttachmentMutation, AddMessageAttachmentMutationVariables>(AddMessageAttachmentDocument, baseOptions);
      }
export type AddMessageAttachmentMutationHookResult = ReturnType<typeof useAddMessageAttachmentMutation>;
export type AddMessageAttachmentMutationResult = Apollo.MutationResult<AddMessageAttachmentMutation>;
export type AddMessageAttachmentMutationOptions = Apollo.BaseMutationOptions<AddMessageAttachmentMutation, AddMessageAttachmentMutationVariables>;
export const AddMessageRecipientsDocument = gql`
    mutation AddMessageRecipients($userId: uuid!, $messageId: uuid!, $now: timestamptz!) {
  insert_messages_recipients(objects: {user_id: $userId, message_id: $messageId, received_at: $now}) {
    returning {
      ...MessageRecipients
    }
  }
}
    ${MessageRecipientsFragmentDoc}`;
export type AddMessageRecipientsMutationFn = Apollo.MutationFunction<AddMessageRecipientsMutation, AddMessageRecipientsMutationVariables>;

/**
 * __useAddMessageRecipientsMutation__
 *
 * To run a mutation, you first call `useAddMessageRecipientsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageRecipientsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageRecipientsMutation, { data, loading, error }] = useAddMessageRecipientsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      messageId: // value for 'messageId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useAddMessageRecipientsMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageRecipientsMutation, AddMessageRecipientsMutationVariables>) {
        return Apollo.useMutation<AddMessageRecipientsMutation, AddMessageRecipientsMutationVariables>(AddMessageRecipientsDocument, baseOptions);
      }
export type AddMessageRecipientsMutationHookResult = ReturnType<typeof useAddMessageRecipientsMutation>;
export type AddMessageRecipientsMutationResult = Apollo.MutationResult<AddMessageRecipientsMutation>;
export type AddMessageRecipientsMutationOptions = Apollo.BaseMutationOptions<AddMessageRecipientsMutation, AddMessageRecipientsMutationVariables>;
export const AddMessageDocument = gql`
    mutation AddMessage($pollId: uuid!, $userId: uuid!, $text: String!, $now: timestamptz!) {
  insert_messages(objects: {poll_id: $pollId, posted_by: $userId, text: $text}) {
    returning {
      ...Message
    }
  }
  update_polls(where: {id: {_eq: $pollId}}, _set: {updated_at: $now}) {
    affected_rows
  }
}
    ${MessageFragmentDoc}`;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *      userId: // value for 'userId'
 *      text: // value for 'text'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, baseOptions);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const AddRecipientsDocument = gql`
    mutation AddRecipients($userId: uuid!, $commentId: uuid!, $now: timestamptz!) {
  insert_recipients(objects: {user_id: $userId, comment_id: $commentId, received_at: $now}) {
    returning {
      ...Recipients
    }
  }
}
    ${RecipientsFragmentDoc}`;
export type AddRecipientsMutationFn = Apollo.MutationFunction<AddRecipientsMutation, AddRecipientsMutationVariables>;

/**
 * __useAddRecipientsMutation__
 *
 * To run a mutation, you first call `useAddRecipientsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecipientsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecipientsMutation, { data, loading, error }] = useAddRecipientsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      commentId: // value for 'commentId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useAddRecipientsMutation(baseOptions?: Apollo.MutationHookOptions<AddRecipientsMutation, AddRecipientsMutationVariables>) {
        return Apollo.useMutation<AddRecipientsMutation, AddRecipientsMutationVariables>(AddRecipientsDocument, baseOptions);
      }
export type AddRecipientsMutationHookResult = ReturnType<typeof useAddRecipientsMutation>;
export type AddRecipientsMutationResult = Apollo.MutationResult<AddRecipientsMutation>;
export type AddRecipientsMutationOptions = Apollo.BaseMutationOptions<AddRecipientsMutation, AddRecipientsMutationVariables>;
export const AddUserToPollDocument = gql`
    mutation AddUserToPoll($userId: uuid!, $pollId: uuid!) {
  insert_users_polls(objects: {user_id: $userId, poll_id: $pollId}) {
    returning {
      id
    }
  }
}
    `;
export type AddUserToPollMutationFn = Apollo.MutationFunction<AddUserToPollMutation, AddUserToPollMutationVariables>;

/**
 * __useAddUserToPollMutation__
 *
 * To run a mutation, you first call `useAddUserToPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToPollMutation, { data, loading, error }] = useAddUserToPollMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useAddUserToPollMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToPollMutation, AddUserToPollMutationVariables>) {
        return Apollo.useMutation<AddUserToPollMutation, AddUserToPollMutationVariables>(AddUserToPollDocument, baseOptions);
      }
export type AddUserToPollMutationHookResult = ReturnType<typeof useAddUserToPollMutation>;
export type AddUserToPollMutationResult = Apollo.MutationResult<AddUserToPollMutation>;
export type AddUserToPollMutationOptions = Apollo.BaseMutationOptions<AddUserToPollMutation, AddUserToPollMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($userId: uuid!, $blockedBy: uuid!) {
  insert_blocked_users_one(object: {user_id: $userId, blocked_by: $blockedBy}) {
    id
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      blockedBy: // value for 'blockedBy'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, baseOptions);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const CreatePollDocument = gql`
    mutation CreatePoll($name: String!, $userId: uuid!) {
  insert_polls(objects: {name: $name, created_by: $userId}) {
    returning {
      id
    }
  }
}
    `;
export type CreatePollMutationFn = Apollo.MutationFunction<CreatePollMutation, CreatePollMutationVariables>;

/**
 * __useCreatePollMutation__
 *
 * To run a mutation, you first call `useCreatePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPollMutation, { data, loading, error }] = useCreatePollMutation({
 *   variables: {
 *      name: // value for 'name'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreatePollMutation(baseOptions?: Apollo.MutationHookOptions<CreatePollMutation, CreatePollMutationVariables>) {
        return Apollo.useMutation<CreatePollMutation, CreatePollMutationVariables>(CreatePollDocument, baseOptions);
      }
export type CreatePollMutationHookResult = ReturnType<typeof useCreatePollMutation>;
export type CreatePollMutationResult = Apollo.MutationResult<CreatePollMutation>;
export type CreatePollMutationOptions = Apollo.BaseMutationOptions<CreatePollMutation, CreatePollMutationVariables>;
export const CreateReminderDocument = gql`
    mutation CreateReminder($userId: uuid!, $linkId: uuid!, $pollId: uuid!, $sendToGroup: Boolean!, $sendAt: timestamptz!) {
  insert_reminders(objects: {created_by: $userId, link_id: $linkId, poll_id: $pollId, send_to_group: $sendToGroup, send_at: $sendAt}) {
    returning {
      id
    }
  }
}
    `;
export type CreateReminderMutationFn = Apollo.MutationFunction<CreateReminderMutation, CreateReminderMutationVariables>;

/**
 * __useCreateReminderMutation__
 *
 * To run a mutation, you first call `useCreateReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReminderMutation, { data, loading, error }] = useCreateReminderMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      linkId: // value for 'linkId'
 *      pollId: // value for 'pollId'
 *      sendToGroup: // value for 'sendToGroup'
 *      sendAt: // value for 'sendAt'
 *   },
 * });
 */
export function useCreateReminderMutation(baseOptions?: Apollo.MutationHookOptions<CreateReminderMutation, CreateReminderMutationVariables>) {
        return Apollo.useMutation<CreateReminderMutation, CreateReminderMutationVariables>(CreateReminderDocument, baseOptions);
      }
export type CreateReminderMutationHookResult = ReturnType<typeof useCreateReminderMutation>;
export type CreateReminderMutationResult = Apollo.MutationResult<CreateReminderMutation>;
export type CreateReminderMutationOptions = Apollo.BaseMutationOptions<CreateReminderMutation, CreateReminderMutationVariables>;
export const CreateSubpollDocument = gql`
    mutation CreateSubpoll($name: String!, $icon: String!, $userId: uuid!, $pollParentId: uuid!) {
  result: insert_polls(objects: {name: $name, icon: $icon, created_by: $userId, poll_parent_id: $pollParentId, type: "sub"}) {
    subpoll: returning {
      id
    }
  }
}
    `;
export type CreateSubpollMutationFn = Apollo.MutationFunction<CreateSubpollMutation, CreateSubpollMutationVariables>;

/**
 * __useCreateSubpollMutation__
 *
 * To run a mutation, you first call `useCreateSubpollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubpollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubpollMutation, { data, loading, error }] = useCreateSubpollMutation({
 *   variables: {
 *      name: // value for 'name'
 *      icon: // value for 'icon'
 *      userId: // value for 'userId'
 *      pollParentId: // value for 'pollParentId'
 *   },
 * });
 */
export function useCreateSubpollMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubpollMutation, CreateSubpollMutationVariables>) {
        return Apollo.useMutation<CreateSubpollMutation, CreateSubpollMutationVariables>(CreateSubpollDocument, baseOptions);
      }
export type CreateSubpollMutationHookResult = ReturnType<typeof useCreateSubpollMutation>;
export type CreateSubpollMutationResult = Apollo.MutationResult<CreateSubpollMutation>;
export type CreateSubpollMutationOptions = Apollo.BaseMutationOptions<CreateSubpollMutation, CreateSubpollMutationVariables>;
export const CreateWebhookDocument = gql`
    mutation CreateWebhook($userId: uuid!, $pollId: uuid!, $url: String!) {
  insert_webhooks(objects: {created_by: $userId, poll_id: $pollId, url: $url}) {
    returning {
      id
    }
  }
}
    `;
export type CreateWebhookMutationFn = Apollo.MutationFunction<CreateWebhookMutation, CreateWebhookMutationVariables>;

/**
 * __useCreateWebhookMutation__
 *
 * To run a mutation, you first call `useCreateWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebhookMutation, { data, loading, error }] = useCreateWebhookMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateWebhookMutation(baseOptions?: Apollo.MutationHookOptions<CreateWebhookMutation, CreateWebhookMutationVariables>) {
        return Apollo.useMutation<CreateWebhookMutation, CreateWebhookMutationVariables>(CreateWebhookDocument, baseOptions);
      }
export type CreateWebhookMutationHookResult = ReturnType<typeof useCreateWebhookMutation>;
export type CreateWebhookMutationResult = Apollo.MutationResult<CreateWebhookMutation>;
export type CreateWebhookMutationOptions = Apollo.BaseMutationOptions<CreateWebhookMutation, CreateWebhookMutationVariables>;
export const DeleteDownvoteDocument = gql`
    mutation DeleteDownvote($linkId: uuid!, $userId: uuid!) {
  delete_downvotes(where: {link_id: {_eq: $linkId}, created_by: {_eq: $userId}}) {
    affected_rows
  }
}
    `;
export type DeleteDownvoteMutationFn = Apollo.MutationFunction<DeleteDownvoteMutation, DeleteDownvoteMutationVariables>;

/**
 * __useDeleteDownvoteMutation__
 *
 * To run a mutation, you first call `useDeleteDownvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDownvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDownvoteMutation, { data, loading, error }] = useDeleteDownvoteMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteDownvoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDownvoteMutation, DeleteDownvoteMutationVariables>) {
        return Apollo.useMutation<DeleteDownvoteMutation, DeleteDownvoteMutationVariables>(DeleteDownvoteDocument, baseOptions);
      }
export type DeleteDownvoteMutationHookResult = ReturnType<typeof useDeleteDownvoteMutation>;
export type DeleteDownvoteMutationResult = Apollo.MutationResult<DeleteDownvoteMutation>;
export type DeleteDownvoteMutationOptions = Apollo.BaseMutationOptions<DeleteDownvoteMutation, DeleteDownvoteMutationVariables>;
export const DeleteImageFromLinkDocument = gql`
    mutation DeleteImageFromLink($linkId: uuid!) {
  update_links(where: {id: {_eq: $linkId}}, _set: {image: null}) {
    affected_rows
  }
}
    `;
export type DeleteImageFromLinkMutationFn = Apollo.MutationFunction<DeleteImageFromLinkMutation, DeleteImageFromLinkMutationVariables>;

/**
 * __useDeleteImageFromLinkMutation__
 *
 * To run a mutation, you first call `useDeleteImageFromLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageFromLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageFromLinkMutation, { data, loading, error }] = useDeleteImageFromLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useDeleteImageFromLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteImageFromLinkMutation, DeleteImageFromLinkMutationVariables>) {
        return Apollo.useMutation<DeleteImageFromLinkMutation, DeleteImageFromLinkMutationVariables>(DeleteImageFromLinkDocument, baseOptions);
      }
export type DeleteImageFromLinkMutationHookResult = ReturnType<typeof useDeleteImageFromLinkMutation>;
export type DeleteImageFromLinkMutationResult = Apollo.MutationResult<DeleteImageFromLinkMutation>;
export type DeleteImageFromLinkMutationOptions = Apollo.BaseMutationOptions<DeleteImageFromLinkMutation, DeleteImageFromLinkMutationVariables>;
export const DeleteLinkDocument = gql`
    mutation DeleteLink($linkId: uuid!, $now: timestamptz!) {
  update_links_by_pk(pk_columns: {id: $linkId}, _set: {deleted_at: $now}) {
    deleted_at
  }
}
    `;
export type DeleteLinkMutationFn = Apollo.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, baseOptions);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.MutationResult<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.BaseMutationOptions<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: uuid!, $now: timestamptz!) {
  update_messages_by_pk(pk_columns: {id: $messageId}, _set: {deleted_at: $now, text: ""}) {
    deleted_at
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeleteSubpollDocument = gql`
    mutation DeleteSubpoll($pollId: uuid!) {
  delete_links_polls(where: {poll_id: {_eq: $pollId}}) {
    affected_rows
  }
  delete_polls(where: {id: {_eq: $pollId}, type: {_eq: "sub"}}) {
    affected_rows
  }
}
    `;
export type DeleteSubpollMutationFn = Apollo.MutationFunction<DeleteSubpollMutation, DeleteSubpollMutationVariables>;

/**
 * __useDeleteSubpollMutation__
 *
 * To run a mutation, you first call `useDeleteSubpollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubpollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubpollMutation, { data, loading, error }] = useDeleteSubpollMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useDeleteSubpollMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubpollMutation, DeleteSubpollMutationVariables>) {
        return Apollo.useMutation<DeleteSubpollMutation, DeleteSubpollMutationVariables>(DeleteSubpollDocument, baseOptions);
      }
export type DeleteSubpollMutationHookResult = ReturnType<typeof useDeleteSubpollMutation>;
export type DeleteSubpollMutationResult = Apollo.MutationResult<DeleteSubpollMutation>;
export type DeleteSubpollMutationOptions = Apollo.BaseMutationOptions<DeleteSubpollMutation, DeleteSubpollMutationVariables>;
export const DeleteUpvoteDocument = gql`
    mutation DeleteUpvote($linkId: uuid!, $userId: uuid!) {
  delete_upvotes(where: {link_id: {_eq: $linkId}, created_by: {_eq: $userId}}) {
    affected_rows
  }
}
    `;
export type DeleteUpvoteMutationFn = Apollo.MutationFunction<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>;

/**
 * __useDeleteUpvoteMutation__
 *
 * To run a mutation, you first call `useDeleteUpvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUpvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUpvoteMutation, { data, loading, error }] = useDeleteUpvoteMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUpvoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>) {
        return Apollo.useMutation<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>(DeleteUpvoteDocument, baseOptions);
      }
export type DeleteUpvoteMutationHookResult = ReturnType<typeof useDeleteUpvoteMutation>;
export type DeleteUpvoteMutationResult = Apollo.MutationResult<DeleteUpvoteMutation>;
export type DeleteUpvoteMutationOptions = Apollo.BaseMutationOptions<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>;
export const DownvoteLinkDocument = gql`
    mutation DownvoteLink($linkId: uuid!, $userId: uuid!) {
  delete_upvotes(where: {link_id: {_eq: $linkId}, created_by: {_eq: $userId}}) {
    affected_rows
  }
  insert_downvotes(objects: {link_id: $linkId, created_by: $userId}) {
    returning {
      id
      user {
        ...User
      }
      created_at
    }
  }
}
    ${UserFragmentDoc}`;
export type DownvoteLinkMutationFn = Apollo.MutationFunction<DownvoteLinkMutation, DownvoteLinkMutationVariables>;

/**
 * __useDownvoteLinkMutation__
 *
 * To run a mutation, you first call `useDownvoteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownvoteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downvoteLinkMutation, { data, loading, error }] = useDownvoteLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDownvoteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DownvoteLinkMutation, DownvoteLinkMutationVariables>) {
        return Apollo.useMutation<DownvoteLinkMutation, DownvoteLinkMutationVariables>(DownvoteLinkDocument, baseOptions);
      }
export type DownvoteLinkMutationHookResult = ReturnType<typeof useDownvoteLinkMutation>;
export type DownvoteLinkMutationResult = Apollo.MutationResult<DownvoteLinkMutation>;
export type DownvoteLinkMutationOptions = Apollo.BaseMutationOptions<DownvoteLinkMutation, DownvoteLinkMutationVariables>;
export const FollowPollDocument = gql`
    mutation FollowPoll($userId: uuid!, $pollId: uuid!) {
  insert_users_followed_polls(objects: {user_id: $userId, poll_id: $pollId}) {
    returning {
      id
    }
  }
}
    `;
export type FollowPollMutationFn = Apollo.MutationFunction<FollowPollMutation, FollowPollMutationVariables>;

/**
 * __useFollowPollMutation__
 *
 * To run a mutation, you first call `useFollowPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followPollMutation, { data, loading, error }] = useFollowPollMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useFollowPollMutation(baseOptions?: Apollo.MutationHookOptions<FollowPollMutation, FollowPollMutationVariables>) {
        return Apollo.useMutation<FollowPollMutation, FollowPollMutationVariables>(FollowPollDocument, baseOptions);
      }
export type FollowPollMutationHookResult = ReturnType<typeof useFollowPollMutation>;
export type FollowPollMutationResult = Apollo.MutationResult<FollowPollMutation>;
export type FollowPollMutationOptions = Apollo.BaseMutationOptions<FollowPollMutation, FollowPollMutationVariables>;
export const HideLinkMarkedDoneDocument = gql`
    mutation HideLinkMarkedDone($linkId: uuid!) {
  update_links(where: {id: {_eq: $linkId}}, _set: {hidden: true, happened_at: null}) {
    affected_rows
  }
}
    `;
export type HideLinkMarkedDoneMutationFn = Apollo.MutationFunction<HideLinkMarkedDoneMutation, HideLinkMarkedDoneMutationVariables>;

/**
 * __useHideLinkMarkedDoneMutation__
 *
 * To run a mutation, you first call `useHideLinkMarkedDoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideLinkMarkedDoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideLinkMarkedDoneMutation, { data, loading, error }] = useHideLinkMarkedDoneMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useHideLinkMarkedDoneMutation(baseOptions?: Apollo.MutationHookOptions<HideLinkMarkedDoneMutation, HideLinkMarkedDoneMutationVariables>) {
        return Apollo.useMutation<HideLinkMarkedDoneMutation, HideLinkMarkedDoneMutationVariables>(HideLinkMarkedDoneDocument, baseOptions);
      }
export type HideLinkMarkedDoneMutationHookResult = ReturnType<typeof useHideLinkMarkedDoneMutation>;
export type HideLinkMarkedDoneMutationResult = Apollo.MutationResult<HideLinkMarkedDoneMutation>;
export type HideLinkMarkedDoneMutationOptions = Apollo.BaseMutationOptions<HideLinkMarkedDoneMutation, HideLinkMarkedDoneMutationVariables>;
export const HideLinkDocument = gql`
    mutation HideLink($linkId: uuid!) {
  update_links(where: {id: {_eq: $linkId}}, _set: {hidden: true}) {
    affected_rows
  }
}
    `;
export type HideLinkMutationFn = Apollo.MutationFunction<HideLinkMutation, HideLinkMutationVariables>;

/**
 * __useHideLinkMutation__
 *
 * To run a mutation, you first call `useHideLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideLinkMutation, { data, loading, error }] = useHideLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useHideLinkMutation(baseOptions?: Apollo.MutationHookOptions<HideLinkMutation, HideLinkMutationVariables>) {
        return Apollo.useMutation<HideLinkMutation, HideLinkMutationVariables>(HideLinkDocument, baseOptions);
      }
export type HideLinkMutationHookResult = ReturnType<typeof useHideLinkMutation>;
export type HideLinkMutationResult = Apollo.MutationResult<HideLinkMutation>;
export type HideLinkMutationOptions = Apollo.BaseMutationOptions<HideLinkMutation, HideLinkMutationVariables>;
export const JoinPrivatePollDocument = gql`
    mutation JoinPrivatePoll($code: String!, $userId: String!, $pollId: String) {
  result: nest_joinPrivatePoll(code: $code, userId: $userId, pollId: $pollId) {
    success
    message
  }
}
    `;
export type JoinPrivatePollMutationFn = Apollo.MutationFunction<JoinPrivatePollMutation, JoinPrivatePollMutationVariables>;

/**
 * __useJoinPrivatePollMutation__
 *
 * To run a mutation, you first call `useJoinPrivatePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinPrivatePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinPrivatePollMutation, { data, loading, error }] = useJoinPrivatePollMutation({
 *   variables: {
 *      code: // value for 'code'
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useJoinPrivatePollMutation(baseOptions?: Apollo.MutationHookOptions<JoinPrivatePollMutation, JoinPrivatePollMutationVariables>) {
        return Apollo.useMutation<JoinPrivatePollMutation, JoinPrivatePollMutationVariables>(JoinPrivatePollDocument, baseOptions);
      }
export type JoinPrivatePollMutationHookResult = ReturnType<typeof useJoinPrivatePollMutation>;
export type JoinPrivatePollMutationResult = Apollo.MutationResult<JoinPrivatePollMutation>;
export type JoinPrivatePollMutationOptions = Apollo.BaseMutationOptions<JoinPrivatePollMutation, JoinPrivatePollMutationVariables>;
export const LeavePollDocument = gql`
    mutation LeavePoll($userId: uuid!, $pollId: uuid!) {
  delete_users_polls(where: {user_id: {_eq: $userId}, poll_id: {_eq: $pollId}}) {
    affected_rows
  }
}
    `;
export type LeavePollMutationFn = Apollo.MutationFunction<LeavePollMutation, LeavePollMutationVariables>;

/**
 * __useLeavePollMutation__
 *
 * To run a mutation, you first call `useLeavePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeavePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leavePollMutation, { data, loading, error }] = useLeavePollMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useLeavePollMutation(baseOptions?: Apollo.MutationHookOptions<LeavePollMutation, LeavePollMutationVariables>) {
        return Apollo.useMutation<LeavePollMutation, LeavePollMutationVariables>(LeavePollDocument, baseOptions);
      }
export type LeavePollMutationHookResult = ReturnType<typeof useLeavePollMutation>;
export type LeavePollMutationResult = Apollo.MutationResult<LeavePollMutation>;
export type LeavePollMutationOptions = Apollo.BaseMutationOptions<LeavePollMutation, LeavePollMutationVariables>;
export const MarkLinkDoneDocument = gql`
    mutation MarkLinkDone($linkId: uuid!, $now: timestamptz!) {
  update_links(where: {id: {_eq: $linkId}}, _set: {happened_at: $now}) {
    affected_rows
  }
}
    `;
export type MarkLinkDoneMutationFn = Apollo.MutationFunction<MarkLinkDoneMutation, MarkLinkDoneMutationVariables>;

/**
 * __useMarkLinkDoneMutation__
 *
 * To run a mutation, you first call `useMarkLinkDoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkLinkDoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markLinkDoneMutation, { data, loading, error }] = useMarkLinkDoneMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useMarkLinkDoneMutation(baseOptions?: Apollo.MutationHookOptions<MarkLinkDoneMutation, MarkLinkDoneMutationVariables>) {
        return Apollo.useMutation<MarkLinkDoneMutation, MarkLinkDoneMutationVariables>(MarkLinkDoneDocument, baseOptions);
      }
export type MarkLinkDoneMutationHookResult = ReturnType<typeof useMarkLinkDoneMutation>;
export type MarkLinkDoneMutationResult = Apollo.MutationResult<MarkLinkDoneMutation>;
export type MarkLinkDoneMutationOptions = Apollo.BaseMutationOptions<MarkLinkDoneMutation, MarkLinkDoneMutationVariables>;
export const MarkLinkUndoneDocument = gql`
    mutation MarkLinkUndone($linkId: uuid!) {
  update_links(where: {id: {_eq: $linkId}}, _set: {happened_at: null}) {
    affected_rows
  }
}
    `;
export type MarkLinkUndoneMutationFn = Apollo.MutationFunction<MarkLinkUndoneMutation, MarkLinkUndoneMutationVariables>;

/**
 * __useMarkLinkUndoneMutation__
 *
 * To run a mutation, you first call `useMarkLinkUndoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkLinkUndoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markLinkUndoneMutation, { data, loading, error }] = useMarkLinkUndoneMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useMarkLinkUndoneMutation(baseOptions?: Apollo.MutationHookOptions<MarkLinkUndoneMutation, MarkLinkUndoneMutationVariables>) {
        return Apollo.useMutation<MarkLinkUndoneMutation, MarkLinkUndoneMutationVariables>(MarkLinkUndoneDocument, baseOptions);
      }
export type MarkLinkUndoneMutationHookResult = ReturnType<typeof useMarkLinkUndoneMutation>;
export type MarkLinkUndoneMutationResult = Apollo.MutationResult<MarkLinkUndoneMutation>;
export type MarkLinkUndoneMutationOptions = Apollo.BaseMutationOptions<MarkLinkUndoneMutation, MarkLinkUndoneMutationVariables>;
export const RemoveLinkFromPollDocument = gql`
    mutation RemoveLinkFromPoll($linkId: uuid!, $pollId: uuid!) {
  delete_links_polls(where: {link_id: {_eq: $linkId}, poll_id: {_eq: $pollId}}) {
    affected_rows
  }
}
    `;
export type RemoveLinkFromPollMutationFn = Apollo.MutationFunction<RemoveLinkFromPollMutation, RemoveLinkFromPollMutationVariables>;

/**
 * __useRemoveLinkFromPollMutation__
 *
 * To run a mutation, you first call `useRemoveLinkFromPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLinkFromPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLinkFromPollMutation, { data, loading, error }] = useRemoveLinkFromPollMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useRemoveLinkFromPollMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLinkFromPollMutation, RemoveLinkFromPollMutationVariables>) {
        return Apollo.useMutation<RemoveLinkFromPollMutation, RemoveLinkFromPollMutationVariables>(RemoveLinkFromPollDocument, baseOptions);
      }
export type RemoveLinkFromPollMutationHookResult = ReturnType<typeof useRemoveLinkFromPollMutation>;
export type RemoveLinkFromPollMutationResult = Apollo.MutationResult<RemoveLinkFromPollMutation>;
export type RemoveLinkFromPollMutationOptions = Apollo.BaseMutationOptions<RemoveLinkFromPollMutation, RemoveLinkFromPollMutationVariables>;
export const ReportLinkDocument = gql`
    mutation ReportLink($linkId: uuid!, $userId: uuid, $reason: String) {
  insert_reported_links(objects: {link_id: $linkId, reported_by: $userId, reason: $reason}) {
    affected_rows
  }
}
    `;
export type ReportLinkMutationFn = Apollo.MutationFunction<ReportLinkMutation, ReportLinkMutationVariables>;

/**
 * __useReportLinkMutation__
 *
 * To run a mutation, you first call `useReportLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportLinkMutation, { data, loading, error }] = useReportLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      userId: // value for 'userId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReportLinkMutation(baseOptions?: Apollo.MutationHookOptions<ReportLinkMutation, ReportLinkMutationVariables>) {
        return Apollo.useMutation<ReportLinkMutation, ReportLinkMutationVariables>(ReportLinkDocument, baseOptions);
      }
export type ReportLinkMutationHookResult = ReturnType<typeof useReportLinkMutation>;
export type ReportLinkMutationResult = Apollo.MutationResult<ReportLinkMutation>;
export type ReportLinkMutationOptions = Apollo.BaseMutationOptions<ReportLinkMutation, ReportLinkMutationVariables>;
export const AskResetPasswordDocument = gql`
    mutation askResetPassword($email: String!) {
  result: nest_askResetUserPassword(email: $email) {
    success
    message
  }
}
    `;
export type AskResetPasswordMutationFn = Apollo.MutationFunction<AskResetPasswordMutation, AskResetPasswordMutationVariables>;

/**
 * __useAskResetPasswordMutation__
 *
 * To run a mutation, you first call `useAskResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askResetPasswordMutation, { data, loading, error }] = useAskResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAskResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<AskResetPasswordMutation, AskResetPasswordMutationVariables>) {
        return Apollo.useMutation<AskResetPasswordMutation, AskResetPasswordMutationVariables>(AskResetPasswordDocument, baseOptions);
      }
export type AskResetPasswordMutationHookResult = ReturnType<typeof useAskResetPasswordMutation>;
export type AskResetPasswordMutationResult = Apollo.MutationResult<AskResetPasswordMutation>;
export type AskResetPasswordMutationOptions = Apollo.BaseMutationOptions<AskResetPasswordMutation, AskResetPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!, $password: String!, $token: String!) {
  result: nest_resetUserPassword(email: $email, password: $password, token: $token) {
    success
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($userId: uuid!, $blockedBy: uuid!) {
  delete_blocked_users(where: {user_id: {_eq: $userId}, blocked_by: {_eq: $blockedBy}}) {
    affected_rows
  }
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      blockedBy: // value for 'blockedBy'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, baseOptions);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const UnfollowPollDocument = gql`
    mutation UnfollowPoll($userId: uuid!, $pollId: uuid!) {
  delete_users_followed_polls(where: {user_id: {_eq: $userId}, poll_id: {_eq: $pollId}}) {
    affected_rows
  }
}
    `;
export type UnfollowPollMutationFn = Apollo.MutationFunction<UnfollowPollMutation, UnfollowPollMutationVariables>;

/**
 * __useUnfollowPollMutation__
 *
 * To run a mutation, you first call `useUnfollowPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowPollMutation, { data, loading, error }] = useUnfollowPollMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useUnfollowPollMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowPollMutation, UnfollowPollMutationVariables>) {
        return Apollo.useMutation<UnfollowPollMutation, UnfollowPollMutationVariables>(UnfollowPollDocument, baseOptions);
      }
export type UnfollowPollMutationHookResult = ReturnType<typeof useUnfollowPollMutation>;
export type UnfollowPollMutationResult = Apollo.MutationResult<UnfollowPollMutation>;
export type UnfollowPollMutationOptions = Apollo.BaseMutationOptions<UnfollowPollMutation, UnfollowPollMutationVariables>;
export const UpdateCommentReadAtDocument = gql`
    mutation updateCommentReadAt($userId: uuid!, $commentId: uuid!, $now: timestamptz!) {
  update_recipients(where: {user_id: {_eq: $userId}, comment_id: {_eq: $commentId}}, _set: {read_at: $now}) {
    affected_rows
    returning {
      id
      read_at
    }
  }
}
    `;
export type UpdateCommentReadAtMutationFn = Apollo.MutationFunction<UpdateCommentReadAtMutation, UpdateCommentReadAtMutationVariables>;

/**
 * __useUpdateCommentReadAtMutation__
 *
 * To run a mutation, you first call `useUpdateCommentReadAtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentReadAtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentReadAtMutation, { data, loading, error }] = useUpdateCommentReadAtMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      commentId: // value for 'commentId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useUpdateCommentReadAtMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentReadAtMutation, UpdateCommentReadAtMutationVariables>) {
        return Apollo.useMutation<UpdateCommentReadAtMutation, UpdateCommentReadAtMutationVariables>(UpdateCommentReadAtDocument, baseOptions);
      }
export type UpdateCommentReadAtMutationHookResult = ReturnType<typeof useUpdateCommentReadAtMutation>;
export type UpdateCommentReadAtMutationResult = Apollo.MutationResult<UpdateCommentReadAtMutation>;
export type UpdateCommentReadAtMutationOptions = Apollo.BaseMutationOptions<UpdateCommentReadAtMutation, UpdateCommentReadAtMutationVariables>;
export const UpdateDevicePushTokenDocument = gql`
    mutation updateDevicePushToken($userId: uuid!, $devicePushToken: jsonb!) {
  update_users(where: {id: {_eq: $userId}}, _set: {device_push_token: $devicePushToken}) {
    affected_rows
    returning {
      device_push_token
    }
  }
}
    `;
export type UpdateDevicePushTokenMutationFn = Apollo.MutationFunction<UpdateDevicePushTokenMutation, UpdateDevicePushTokenMutationVariables>;

/**
 * __useUpdateDevicePushTokenMutation__
 *
 * To run a mutation, you first call `useUpdateDevicePushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDevicePushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDevicePushTokenMutation, { data, loading, error }] = useUpdateDevicePushTokenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      devicePushToken: // value for 'devicePushToken'
 *   },
 * });
 */
export function useUpdateDevicePushTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDevicePushTokenMutation, UpdateDevicePushTokenMutationVariables>) {
        return Apollo.useMutation<UpdateDevicePushTokenMutation, UpdateDevicePushTokenMutationVariables>(UpdateDevicePushTokenDocument, baseOptions);
      }
export type UpdateDevicePushTokenMutationHookResult = ReturnType<typeof useUpdateDevicePushTokenMutation>;
export type UpdateDevicePushTokenMutationResult = Apollo.MutationResult<UpdateDevicePushTokenMutation>;
export type UpdateDevicePushTokenMutationOptions = Apollo.BaseMutationOptions<UpdateDevicePushTokenMutation, UpdateDevicePushTokenMutationVariables>;
export const UpdateExpoPushTokenDocument = gql`
    mutation updateExpoPushToken($userId: uuid!, $expoPushToken: String!) {
  update_users(where: {id: {_eq: $userId}}, _set: {expo_push_token: $expoPushToken}) {
    affected_rows
    returning {
      expo_push_token
    }
  }
}
    `;
export type UpdateExpoPushTokenMutationFn = Apollo.MutationFunction<UpdateExpoPushTokenMutation, UpdateExpoPushTokenMutationVariables>;

/**
 * __useUpdateExpoPushTokenMutation__
 *
 * To run a mutation, you first call `useUpdateExpoPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpoPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpoPushTokenMutation, { data, loading, error }] = useUpdateExpoPushTokenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      expoPushToken: // value for 'expoPushToken'
 *   },
 * });
 */
export function useUpdateExpoPushTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExpoPushTokenMutation, UpdateExpoPushTokenMutationVariables>) {
        return Apollo.useMutation<UpdateExpoPushTokenMutation, UpdateExpoPushTokenMutationVariables>(UpdateExpoPushTokenDocument, baseOptions);
      }
export type UpdateExpoPushTokenMutationHookResult = ReturnType<typeof useUpdateExpoPushTokenMutation>;
export type UpdateExpoPushTokenMutationResult = Apollo.MutationResult<UpdateExpoPushTokenMutation>;
export type UpdateExpoPushTokenMutationOptions = Apollo.BaseMutationOptions<UpdateExpoPushTokenMutation, UpdateExpoPushTokenMutationVariables>;
export const UpdateLastSeenDocument = gql`
    mutation updateLastSeen($userId: uuid!, $now: timestamptz!) {
  update_users(where: {id: {_eq: $userId}}, _set: {last_seen_at: $now}) {
    affected_rows
    returning {
      last_seen_at
    }
  }
}
    `;
export type UpdateLastSeenMutationFn = Apollo.MutationFunction<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>;

/**
 * __useUpdateLastSeenMutation__
 *
 * To run a mutation, you first call `useUpdateLastSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastSeenMutation, { data, loading, error }] = useUpdateLastSeenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useUpdateLastSeenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>) {
        return Apollo.useMutation<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>(UpdateLastSeenDocument, baseOptions);
      }
export type UpdateLastSeenMutationHookResult = ReturnType<typeof useUpdateLastSeenMutation>;
export type UpdateLastSeenMutationResult = Apollo.MutationResult<UpdateLastSeenMutation>;
export type UpdateLastSeenMutationOptions = Apollo.BaseMutationOptions<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>;
export const UpdateLinkPostedByDocument = gql`
    mutation UpdateLinkPostedBy($linkId: uuid!, $userId: uuid!) {
  update_links(where: {id: {_eq: $linkId}}, _set: {posted_by: $userId}) {
    affected_rows
  }
}
    `;
export type UpdateLinkPostedByMutationFn = Apollo.MutationFunction<UpdateLinkPostedByMutation, UpdateLinkPostedByMutationVariables>;

/**
 * __useUpdateLinkPostedByMutation__
 *
 * To run a mutation, you first call `useUpdateLinkPostedByMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkPostedByMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkPostedByMutation, { data, loading, error }] = useUpdateLinkPostedByMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateLinkPostedByMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkPostedByMutation, UpdateLinkPostedByMutationVariables>) {
        return Apollo.useMutation<UpdateLinkPostedByMutation, UpdateLinkPostedByMutationVariables>(UpdateLinkPostedByDocument, baseOptions);
      }
export type UpdateLinkPostedByMutationHookResult = ReturnType<typeof useUpdateLinkPostedByMutation>;
export type UpdateLinkPostedByMutationResult = Apollo.MutationResult<UpdateLinkPostedByMutation>;
export type UpdateLinkPostedByMutationOptions = Apollo.BaseMutationOptions<UpdateLinkPostedByMutation, UpdateLinkPostedByMutationVariables>;
export const UpdateLinkUrlDocument = gql`
    mutation UpdateLinkURL($linkId: uuid!, $url: String) {
  update_links(where: {id: {_eq: $linkId}}, _set: {url: $url}) {
    affected_rows
  }
}
    `;
export type UpdateLinkUrlMutationFn = Apollo.MutationFunction<UpdateLinkUrlMutation, UpdateLinkUrlMutationVariables>;

/**
 * __useUpdateLinkUrlMutation__
 *
 * To run a mutation, you first call `useUpdateLinkUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkUrlMutation, { data, loading, error }] = useUpdateLinkUrlMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateLinkUrlMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkUrlMutation, UpdateLinkUrlMutationVariables>) {
        return Apollo.useMutation<UpdateLinkUrlMutation, UpdateLinkUrlMutationVariables>(UpdateLinkUrlDocument, baseOptions);
      }
export type UpdateLinkUrlMutationHookResult = ReturnType<typeof useUpdateLinkUrlMutation>;
export type UpdateLinkUrlMutationResult = Apollo.MutationResult<UpdateLinkUrlMutation>;
export type UpdateLinkUrlMutationOptions = Apollo.BaseMutationOptions<UpdateLinkUrlMutation, UpdateLinkUrlMutationVariables>;
export const UpdateLinkDocument = gql`
    mutation UpdateLink($linkId: uuid!, $name: String, $url: String, $note: String) {
  update_links(where: {id: {_eq: $linkId}}, _set: {name: $name, url: $url, note: $note}) {
    affected_rows
  }
}
    `;
export type UpdateLinkMutationFn = Apollo.MutationFunction<UpdateLinkMutation, UpdateLinkMutationVariables>;

/**
 * __useUpdateLinkMutation__
 *
 * To run a mutation, you first call `useUpdateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkMutation, { data, loading, error }] = useUpdateLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useUpdateLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkMutation, UpdateLinkMutationVariables>) {
        return Apollo.useMutation<UpdateLinkMutation, UpdateLinkMutationVariables>(UpdateLinkDocument, baseOptions);
      }
export type UpdateLinkMutationHookResult = ReturnType<typeof useUpdateLinkMutation>;
export type UpdateLinkMutationResult = Apollo.MutationResult<UpdateLinkMutation>;
export type UpdateLinkMutationOptions = Apollo.BaseMutationOptions<UpdateLinkMutation, UpdateLinkMutationVariables>;
export const UpdateLocaleDocument = gql`
    mutation updateLocale($userId: uuid!, $locale: String!) {
  update_users(where: {id: {_eq: $userId}}, _set: {locale: $locale}) {
    affected_rows
    returning {
      locale
    }
  }
}
    `;
export type UpdateLocaleMutationFn = Apollo.MutationFunction<UpdateLocaleMutation, UpdateLocaleMutationVariables>;

/**
 * __useUpdateLocaleMutation__
 *
 * To run a mutation, you first call `useUpdateLocaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocaleMutation, { data, loading, error }] = useUpdateLocaleMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useUpdateLocaleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocaleMutation, UpdateLocaleMutationVariables>) {
        return Apollo.useMutation<UpdateLocaleMutation, UpdateLocaleMutationVariables>(UpdateLocaleDocument, baseOptions);
      }
export type UpdateLocaleMutationHookResult = ReturnType<typeof useUpdateLocaleMutation>;
export type UpdateLocaleMutationResult = Apollo.MutationResult<UpdateLocaleMutation>;
export type UpdateLocaleMutationOptions = Apollo.BaseMutationOptions<UpdateLocaleMutation, UpdateLocaleMutationVariables>;
export const UpdateMessageReadAtDocument = gql`
    mutation updateMessageReadAt($userId: uuid!, $messageId: uuid!, $now: timestamptz!) {
  update_messages_recipients(where: {user_id: {_eq: $userId}, message_id: {_eq: $messageId}}, _set: {read_at: $now}) {
    affected_rows
    returning {
      id
      read_at
    }
  }
}
    `;
export type UpdateMessageReadAtMutationFn = Apollo.MutationFunction<UpdateMessageReadAtMutation, UpdateMessageReadAtMutationVariables>;

/**
 * __useUpdateMessageReadAtMutation__
 *
 * To run a mutation, you first call `useUpdateMessageReadAtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageReadAtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageReadAtMutation, { data, loading, error }] = useUpdateMessageReadAtMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      messageId: // value for 'messageId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useUpdateMessageReadAtMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageReadAtMutation, UpdateMessageReadAtMutationVariables>) {
        return Apollo.useMutation<UpdateMessageReadAtMutation, UpdateMessageReadAtMutationVariables>(UpdateMessageReadAtDocument, baseOptions);
      }
export type UpdateMessageReadAtMutationHookResult = ReturnType<typeof useUpdateMessageReadAtMutation>;
export type UpdateMessageReadAtMutationResult = Apollo.MutationResult<UpdateMessageReadAtMutation>;
export type UpdateMessageReadAtMutationOptions = Apollo.BaseMutationOptions<UpdateMessageReadAtMutation, UpdateMessageReadAtMutationVariables>;
export const UpdatePollIsListFirstDocument = gql`
    mutation UpdatePollIsListFirst($pollId: uuid!, $isListFirst: Boolean!) {
  update_polls(where: {id: {_eq: $pollId}}, _set: {is_list_first: $isListFirst}) {
    affected_rows
  }
}
    `;
export type UpdatePollIsListFirstMutationFn = Apollo.MutationFunction<UpdatePollIsListFirstMutation, UpdatePollIsListFirstMutationVariables>;

/**
 * __useUpdatePollIsListFirstMutation__
 *
 * To run a mutation, you first call `useUpdatePollIsListFirstMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollIsListFirstMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollIsListFirstMutation, { data, loading, error }] = useUpdatePollIsListFirstMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *      isListFirst: // value for 'isListFirst'
 *   },
 * });
 */
export function useUpdatePollIsListFirstMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePollIsListFirstMutation, UpdatePollIsListFirstMutationVariables>) {
        return Apollo.useMutation<UpdatePollIsListFirstMutation, UpdatePollIsListFirstMutationVariables>(UpdatePollIsListFirstDocument, baseOptions);
      }
export type UpdatePollIsListFirstMutationHookResult = ReturnType<typeof useUpdatePollIsListFirstMutation>;
export type UpdatePollIsListFirstMutationResult = Apollo.MutationResult<UpdatePollIsListFirstMutation>;
export type UpdatePollIsListFirstMutationOptions = Apollo.BaseMutationOptions<UpdatePollIsListFirstMutation, UpdatePollIsListFirstMutationVariables>;
export const UpdatePollSetPrivateDocument = gql`
    mutation UpdatePollSetPrivate($pollId: uuid!) {
  update_polls(where: {id: {_eq: $pollId}}, _set: {type: "private"}) {
    affected_rows
  }
}
    `;
export type UpdatePollSetPrivateMutationFn = Apollo.MutationFunction<UpdatePollSetPrivateMutation, UpdatePollSetPrivateMutationVariables>;

/**
 * __useUpdatePollSetPrivateMutation__
 *
 * To run a mutation, you first call `useUpdatePollSetPrivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollSetPrivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollSetPrivateMutation, { data, loading, error }] = useUpdatePollSetPrivateMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useUpdatePollSetPrivateMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePollSetPrivateMutation, UpdatePollSetPrivateMutationVariables>) {
        return Apollo.useMutation<UpdatePollSetPrivateMutation, UpdatePollSetPrivateMutationVariables>(UpdatePollSetPrivateDocument, baseOptions);
      }
export type UpdatePollSetPrivateMutationHookResult = ReturnType<typeof useUpdatePollSetPrivateMutation>;
export type UpdatePollSetPrivateMutationResult = Apollo.MutationResult<UpdatePollSetPrivateMutation>;
export type UpdatePollSetPrivateMutationOptions = Apollo.BaseMutationOptions<UpdatePollSetPrivateMutation, UpdatePollSetPrivateMutationVariables>;
export const UpdatePollSetPublicDocument = gql`
    mutation UpdatePollSetPublic($pollId: uuid!) {
  update_polls(where: {id: {_eq: $pollId}}, _set: {type: "public"}) {
    affected_rows
  }
}
    `;
export type UpdatePollSetPublicMutationFn = Apollo.MutationFunction<UpdatePollSetPublicMutation, UpdatePollSetPublicMutationVariables>;

/**
 * __useUpdatePollSetPublicMutation__
 *
 * To run a mutation, you first call `useUpdatePollSetPublicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollSetPublicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollSetPublicMutation, { data, loading, error }] = useUpdatePollSetPublicMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useUpdatePollSetPublicMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePollSetPublicMutation, UpdatePollSetPublicMutationVariables>) {
        return Apollo.useMutation<UpdatePollSetPublicMutation, UpdatePollSetPublicMutationVariables>(UpdatePollSetPublicDocument, baseOptions);
      }
export type UpdatePollSetPublicMutationHookResult = ReturnType<typeof useUpdatePollSetPublicMutation>;
export type UpdatePollSetPublicMutationResult = Apollo.MutationResult<UpdatePollSetPublicMutation>;
export type UpdatePollSetPublicMutationOptions = Apollo.BaseMutationOptions<UpdatePollSetPublicMutation, UpdatePollSetPublicMutationVariables>;
export const UpdatePollDocument = gql`
    mutation UpdatePoll($pollId: uuid!, $name: String!, $description: String!) {
  update_polls(where: {id: {_eq: $pollId}}, _set: {name: $name, description: $description}) {
    affected_rows
  }
}
    `;
export type UpdatePollMutationFn = Apollo.MutationFunction<UpdatePollMutation, UpdatePollMutationVariables>;

/**
 * __useUpdatePollMutation__
 *
 * To run a mutation, you first call `useUpdatePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollMutation, { data, loading, error }] = useUpdatePollMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdatePollMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePollMutation, UpdatePollMutationVariables>) {
        return Apollo.useMutation<UpdatePollMutation, UpdatePollMutationVariables>(UpdatePollDocument, baseOptions);
      }
export type UpdatePollMutationHookResult = ReturnType<typeof useUpdatePollMutation>;
export type UpdatePollMutationResult = Apollo.MutationResult<UpdatePollMutation>;
export type UpdatePollMutationOptions = Apollo.BaseMutationOptions<UpdatePollMutation, UpdatePollMutationVariables>;
export const UpdateSubpollDocument = gql`
    mutation UpdateSubpoll($pollId: uuid!, $icon: String!, $name: String!) {
  update_polls(where: {id: {_eq: $pollId}}, _set: {icon: $icon, name: $name}) {
    affected_rows
  }
}
    `;
export type UpdateSubpollMutationFn = Apollo.MutationFunction<UpdateSubpollMutation, UpdateSubpollMutationVariables>;

/**
 * __useUpdateSubpollMutation__
 *
 * To run a mutation, you first call `useUpdateSubpollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubpollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubpollMutation, { data, loading, error }] = useUpdateSubpollMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *      icon: // value for 'icon'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateSubpollMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubpollMutation, UpdateSubpollMutationVariables>) {
        return Apollo.useMutation<UpdateSubpollMutation, UpdateSubpollMutationVariables>(UpdateSubpollDocument, baseOptions);
      }
export type UpdateSubpollMutationHookResult = ReturnType<typeof useUpdateSubpollMutation>;
export type UpdateSubpollMutationResult = Apollo.MutationResult<UpdateSubpollMutation>;
export type UpdateSubpollMutationOptions = Apollo.BaseMutationOptions<UpdateSubpollMutation, UpdateSubpollMutationVariables>;
export const UpdateWebhookDocument = gql`
    mutation UpdateWebhook($webhookId: uuid!, $url: String!, $active: Boolean!) {
  update_webhooks(where: {id: {_eq: $webhookId}}, _set: {url: $url, active: $active}) {
    affected_rows
  }
}
    `;
export type UpdateWebhookMutationFn = Apollo.MutationFunction<UpdateWebhookMutation, UpdateWebhookMutationVariables>;

/**
 * __useUpdateWebhookMutation__
 *
 * To run a mutation, you first call `useUpdateWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWebhookMutation, { data, loading, error }] = useUpdateWebhookMutation({
 *   variables: {
 *      webhookId: // value for 'webhookId'
 *      url: // value for 'url'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useUpdateWebhookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWebhookMutation, UpdateWebhookMutationVariables>) {
        return Apollo.useMutation<UpdateWebhookMutation, UpdateWebhookMutationVariables>(UpdateWebhookDocument, baseOptions);
      }
export type UpdateWebhookMutationHookResult = ReturnType<typeof useUpdateWebhookMutation>;
export type UpdateWebhookMutationResult = Apollo.MutationResult<UpdateWebhookMutation>;
export type UpdateWebhookMutationOptions = Apollo.BaseMutationOptions<UpdateWebhookMutation, UpdateWebhookMutationVariables>;
export const UploadAttachmentDocument = gql`
    mutation uploadAttachment($file: Upload!, $resourceId: String!, $resourceType: String!) {
  attachment: nest_uploadFile(file: $file, resourceId: $resourceId, resourceType: $resourceType) {
    id
    reference
    url
  }
}
    `;
export type UploadAttachmentMutationFn = Apollo.MutationFunction<UploadAttachmentMutation, UploadAttachmentMutationVariables>;

/**
 * __useUploadAttachmentMutation__
 *
 * To run a mutation, you first call `useUploadAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAttachmentMutation, { data, loading, error }] = useUploadAttachmentMutation({
 *   variables: {
 *      file: // value for 'file'
 *      resourceId: // value for 'resourceId'
 *      resourceType: // value for 'resourceType'
 *   },
 * });
 */
export function useUploadAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<UploadAttachmentMutation, UploadAttachmentMutationVariables>) {
        return Apollo.useMutation<UploadAttachmentMutation, UploadAttachmentMutationVariables>(UploadAttachmentDocument, baseOptions);
      }
export type UploadAttachmentMutationHookResult = ReturnType<typeof useUploadAttachmentMutation>;
export type UploadAttachmentMutationResult = Apollo.MutationResult<UploadAttachmentMutation>;
export type UploadAttachmentMutationOptions = Apollo.BaseMutationOptions<UploadAttachmentMutation, UploadAttachmentMutationVariables>;
export const UploadPollPictureDocument = gql`
    mutation uploadPollPicture($pollId: String!, $file: Upload!) {
  result: nest_uploadPollPicture(pollId: $pollId, file: $file) {
    success
    message
  }
}
    `;
export type UploadPollPictureMutationFn = Apollo.MutationFunction<UploadPollPictureMutation, UploadPollPictureMutationVariables>;

/**
 * __useUploadPollPictureMutation__
 *
 * To run a mutation, you first call `useUploadPollPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPollPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPollPictureMutation, { data, loading, error }] = useUploadPollPictureMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadPollPictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadPollPictureMutation, UploadPollPictureMutationVariables>) {
        return Apollo.useMutation<UploadPollPictureMutation, UploadPollPictureMutationVariables>(UploadPollPictureDocument, baseOptions);
      }
export type UploadPollPictureMutationHookResult = ReturnType<typeof useUploadPollPictureMutation>;
export type UploadPollPictureMutationResult = Apollo.MutationResult<UploadPollPictureMutation>;
export type UploadPollPictureMutationOptions = Apollo.BaseMutationOptions<UploadPollPictureMutation, UploadPollPictureMutationVariables>;
export const UploadUserProfilePictureDocument = gql`
    mutation uploadUserProfilePicture($file: Upload!) {
  result: nest_userUploadProfilePicture(file: $file) {
    success
    message
  }
}
    `;
export type UploadUserProfilePictureMutationFn = Apollo.MutationFunction<UploadUserProfilePictureMutation, UploadUserProfilePictureMutationVariables>;

/**
 * __useUploadUserProfilePictureMutation__
 *
 * To run a mutation, you first call `useUploadUserProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadUserProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadUserProfilePictureMutation, { data, loading, error }] = useUploadUserProfilePictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadUserProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadUserProfilePictureMutation, UploadUserProfilePictureMutationVariables>) {
        return Apollo.useMutation<UploadUserProfilePictureMutation, UploadUserProfilePictureMutationVariables>(UploadUserProfilePictureDocument, baseOptions);
      }
export type UploadUserProfilePictureMutationHookResult = ReturnType<typeof useUploadUserProfilePictureMutation>;
export type UploadUserProfilePictureMutationResult = Apollo.MutationResult<UploadUserProfilePictureMutation>;
export type UploadUserProfilePictureMutationOptions = Apollo.BaseMutationOptions<UploadUserProfilePictureMutation, UploadUserProfilePictureMutationVariables>;
export const UpvoteLinkDocument = gql`
    mutation UpvoteLink($linkId: uuid!, $pollId: uuid!, $userId: uuid!, $now: timestamptz!) {
  insert_upvotes(objects: {link_id: $linkId, created_by: $userId}) {
    returning {
      id
      user {
        ...User
      }
      created_at
    }
  }
  update_links(where: {id: {_eq: $linkId}}, _set: {updated_at: $now}) {
    affected_rows
  }
  update_polls(where: {id: {_eq: $pollId}}, _set: {updated_at: $now}) {
    affected_rows
  }
}
    ${UserFragmentDoc}`;
export type UpvoteLinkMutationFn = Apollo.MutationFunction<UpvoteLinkMutation, UpvoteLinkMutationVariables>;

/**
 * __useUpvoteLinkMutation__
 *
 * To run a mutation, you first call `useUpvoteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpvoteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upvoteLinkMutation, { data, loading, error }] = useUpvoteLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      pollId: // value for 'pollId'
 *      userId: // value for 'userId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useUpvoteLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpvoteLinkMutation, UpvoteLinkMutationVariables>) {
        return Apollo.useMutation<UpvoteLinkMutation, UpvoteLinkMutationVariables>(UpvoteLinkDocument, baseOptions);
      }
export type UpvoteLinkMutationHookResult = ReturnType<typeof useUpvoteLinkMutation>;
export type UpvoteLinkMutationResult = Apollo.MutationResult<UpvoteLinkMutation>;
export type UpvoteLinkMutationOptions = Apollo.BaseMutationOptions<UpvoteLinkMutation, UpvoteLinkMutationVariables>;
export const GetCommentsForLinkIdDocument = gql`
    query GetCommentsForLinkId($id: uuid!, $offset: Int, $limit: Int) {
  link: links(where: {id: {_eq: $id}}) {
    id
    name
    title
    comments(order_by: {created_at: desc}, offset: $offset, limit: $limit) @connection(key: "comments") {
      ...Comment
    }
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetCommentsForLinkIdQuery__
 *
 * To run a query within a React component, call `useGetCommentsForLinkIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsForLinkIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsForLinkIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetCommentsForLinkIdQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsForLinkIdQuery, GetCommentsForLinkIdQueryVariables>) {
        return Apollo.useQuery<GetCommentsForLinkIdQuery, GetCommentsForLinkIdQueryVariables>(GetCommentsForLinkIdDocument, baseOptions);
      }
export function useGetCommentsForLinkIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsForLinkIdQuery, GetCommentsForLinkIdQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentsForLinkIdQuery, GetCommentsForLinkIdQueryVariables>(GetCommentsForLinkIdDocument, baseOptions);
        }
export type GetCommentsForLinkIdQueryHookResult = ReturnType<typeof useGetCommentsForLinkIdQuery>;
export type GetCommentsForLinkIdLazyQueryHookResult = ReturnType<typeof useGetCommentsForLinkIdLazyQuery>;
export type GetCommentsForLinkIdQueryResult = Apollo.QueryResult<GetCommentsForLinkIdQuery, GetCommentsForLinkIdQueryVariables>;
export const GetCurrentUserByIdDocument = gql`
    query GetCurrentUserById($id: uuid!) {
  user: users_by_pk(id: $id) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useGetCurrentUserByIdQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCurrentUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserByIdQuery, GetCurrentUserByIdQueryVariables>) {
        return Apollo.useQuery<GetCurrentUserByIdQuery, GetCurrentUserByIdQueryVariables>(GetCurrentUserByIdDocument, baseOptions);
      }
export function useGetCurrentUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserByIdQuery, GetCurrentUserByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetCurrentUserByIdQuery, GetCurrentUserByIdQueryVariables>(GetCurrentUserByIdDocument, baseOptions);
        }
export type GetCurrentUserByIdQueryHookResult = ReturnType<typeof useGetCurrentUserByIdQuery>;
export type GetCurrentUserByIdLazyQueryHookResult = ReturnType<typeof useGetCurrentUserByIdLazyQuery>;
export type GetCurrentUserByIdQueryResult = Apollo.QueryResult<GetCurrentUserByIdQuery, GetCurrentUserByIdQueryVariables>;
export const GetFollowedPollsForUserIdDocument = gql`
    query GetFollowedPollsForUserId($userId: uuid!, $offset: Int!, $limit: Int!) {
  polls: users_followed_polls(where: {user_id: {_eq: $userId}}, order_by: {poll: {updated_at: desc, messages_aggregate: {max: {updated_at: desc_nulls_last}}, links_in_poll_aggregate: {max: {updated_at: desc_nulls_last}}}}, offset: $offset, limit: $limit) {
    id
    poll {
      id
      name
      picture
      description
      type
      subpolls(order_by: {name: asc}) {
        id
      }
      users: users_in_poll {
        id
        user {
          ...User
        }
      }
      newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}}}, limit: 1) {
        id
        link {
          id
          comments(where: {recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
            id
            recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
              id
              read_at
            }
          }
        }
      }
      messages(where: {messages_recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
        id
        recipients: messages_recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
          id
          read_at
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetFollowedPollsForUserIdQuery__
 *
 * To run a query within a React component, call `useGetFollowedPollsForUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowedPollsForUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowedPollsForUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetFollowedPollsForUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowedPollsForUserIdQuery, GetFollowedPollsForUserIdQueryVariables>) {
        return Apollo.useQuery<GetFollowedPollsForUserIdQuery, GetFollowedPollsForUserIdQueryVariables>(GetFollowedPollsForUserIdDocument, baseOptions);
      }
export function useGetFollowedPollsForUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowedPollsForUserIdQuery, GetFollowedPollsForUserIdQueryVariables>) {
          return Apollo.useLazyQuery<GetFollowedPollsForUserIdQuery, GetFollowedPollsForUserIdQueryVariables>(GetFollowedPollsForUserIdDocument, baseOptions);
        }
export type GetFollowedPollsForUserIdQueryHookResult = ReturnType<typeof useGetFollowedPollsForUserIdQuery>;
export type GetFollowedPollsForUserIdLazyQueryHookResult = ReturnType<typeof useGetFollowedPollsForUserIdLazyQuery>;
export type GetFollowedPollsForUserIdQueryResult = Apollo.QueryResult<GetFollowedPollsForUserIdQuery, GetFollowedPollsForUserIdQueryVariables>;
export const GetLastLinkImagePollIdDocument = gql`
    query GetLastLinkImagePollID($id: uuid!) {
  poll: polls_by_pk(id: $id) {
    id
    newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}, url: {_is_null: false}}}, limit: 1) {
      id
      link {
        id
        image
        attachments: links_attachments(limit: 1, order_by: {created_at: desc}) {
          ...LinkAttachments
        }
      }
    }
  }
}
    ${LinkAttachmentsFragmentDoc}`;

/**
 * __useGetLastLinkImagePollIdQuery__
 *
 * To run a query within a React component, call `useGetLastLinkImagePollIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastLinkImagePollIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastLinkImagePollIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLastLinkImagePollIdQuery(baseOptions?: Apollo.QueryHookOptions<GetLastLinkImagePollIdQuery, GetLastLinkImagePollIdQueryVariables>) {
        return Apollo.useQuery<GetLastLinkImagePollIdQuery, GetLastLinkImagePollIdQueryVariables>(GetLastLinkImagePollIdDocument, baseOptions);
      }
export function useGetLastLinkImagePollIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastLinkImagePollIdQuery, GetLastLinkImagePollIdQueryVariables>) {
          return Apollo.useLazyQuery<GetLastLinkImagePollIdQuery, GetLastLinkImagePollIdQueryVariables>(GetLastLinkImagePollIdDocument, baseOptions);
        }
export type GetLastLinkImagePollIdQueryHookResult = ReturnType<typeof useGetLastLinkImagePollIdQuery>;
export type GetLastLinkImagePollIdLazyQueryHookResult = ReturnType<typeof useGetLastLinkImagePollIdLazyQuery>;
export type GetLastLinkImagePollIdQueryResult = Apollo.QueryResult<GetLastLinkImagePollIdQuery, GetLastLinkImagePollIdQueryVariables>;
export const GetLinkByIdDocument = gql`
    query GetLinkById($id: uuid!) {
  link: links_by_pk(id: $id) {
    ...Link
  }
}
    ${LinkFragmentDoc}`;

/**
 * __useGetLinkByIdQuery__
 *
 * To run a query within a React component, call `useGetLinkByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLinkByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetLinkByIdQuery, GetLinkByIdQueryVariables>) {
        return Apollo.useQuery<GetLinkByIdQuery, GetLinkByIdQueryVariables>(GetLinkByIdDocument, baseOptions);
      }
export function useGetLinkByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLinkByIdQuery, GetLinkByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetLinkByIdQuery, GetLinkByIdQueryVariables>(GetLinkByIdDocument, baseOptions);
        }
export type GetLinkByIdQueryHookResult = ReturnType<typeof useGetLinkByIdQuery>;
export type GetLinkByIdLazyQueryHookResult = ReturnType<typeof useGetLinkByIdLazyQuery>;
export type GetLinkByIdQueryResult = Apollo.QueryResult<GetLinkByIdQuery, GetLinkByIdQueryVariables>;
export const GetLinkImageByIdDocument = gql`
    query GetLinkImageById($id: uuid!) {
  link: links_by_pk(id: $id) {
    id
    image
  }
}
    `;

/**
 * __useGetLinkImageByIdQuery__
 *
 * To run a query within a React component, call `useGetLinkImageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkImageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkImageByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLinkImageByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetLinkImageByIdQuery, GetLinkImageByIdQueryVariables>) {
        return Apollo.useQuery<GetLinkImageByIdQuery, GetLinkImageByIdQueryVariables>(GetLinkImageByIdDocument, baseOptions);
      }
export function useGetLinkImageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLinkImageByIdQuery, GetLinkImageByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetLinkImageByIdQuery, GetLinkImageByIdQueryVariables>(GetLinkImageByIdDocument, baseOptions);
        }
export type GetLinkImageByIdQueryHookResult = ReturnType<typeof useGetLinkImageByIdQuery>;
export type GetLinkImageByIdLazyQueryHookResult = ReturnType<typeof useGetLinkImageByIdLazyQuery>;
export type GetLinkImageByIdQueryResult = Apollo.QueryResult<GetLinkImageByIdQuery, GetLinkImageByIdQueryVariables>;
export const GetMessagesAndLinksForPollIdDocument = gql`
    query GetMessagesAndLinksForPollId($id: uuid!, $offset: Int, $limit: Int) {
  poll: polls_by_pk(id: $id) {
    id
    name
    messages_and_links(offset: $offset, limit: $limit) @connection(key: "messages_and_links") {
      type
      links {
        ...Link
      }
      messages @connection(key: "messages") {
        ...Message
      }
    }
  }
}
    ${LinkFragmentDoc}
${MessageFragmentDoc}`;

/**
 * __useGetMessagesAndLinksForPollIdQuery__
 *
 * To run a query within a React component, call `useGetMessagesAndLinksForPollIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesAndLinksForPollIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesAndLinksForPollIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesAndLinksForPollIdQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesAndLinksForPollIdQuery, GetMessagesAndLinksForPollIdQueryVariables>) {
        return Apollo.useQuery<GetMessagesAndLinksForPollIdQuery, GetMessagesAndLinksForPollIdQueryVariables>(GetMessagesAndLinksForPollIdDocument, baseOptions);
      }
export function useGetMessagesAndLinksForPollIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesAndLinksForPollIdQuery, GetMessagesAndLinksForPollIdQueryVariables>) {
          return Apollo.useLazyQuery<GetMessagesAndLinksForPollIdQuery, GetMessagesAndLinksForPollIdQueryVariables>(GetMessagesAndLinksForPollIdDocument, baseOptions);
        }
export type GetMessagesAndLinksForPollIdQueryHookResult = ReturnType<typeof useGetMessagesAndLinksForPollIdQuery>;
export type GetMessagesAndLinksForPollIdLazyQueryHookResult = ReturnType<typeof useGetMessagesAndLinksForPollIdLazyQuery>;
export type GetMessagesAndLinksForPollIdQueryResult = Apollo.QueryResult<GetMessagesAndLinksForPollIdQuery, GetMessagesAndLinksForPollIdQueryVariables>;
export const GetMessagesForPollIdDocument = gql`
    query GetMessagesForPollId($id: uuid!, $offset: Int, $limit: Int) {
  poll: polls_by_pk(id: $id) {
    id
    name
    messages(order_by: {created_at: desc}, offset: $offset, limit: $limit) @connection(key: "messages") {
      ...Message
    }
  }
}
    ${MessageFragmentDoc}`;

/**
 * __useGetMessagesForPollIdQuery__
 *
 * To run a query within a React component, call `useGetMessagesForPollIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesForPollIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesForPollIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesForPollIdQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesForPollIdQuery, GetMessagesForPollIdQueryVariables>) {
        return Apollo.useQuery<GetMessagesForPollIdQuery, GetMessagesForPollIdQueryVariables>(GetMessagesForPollIdDocument, baseOptions);
      }
export function useGetMessagesForPollIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesForPollIdQuery, GetMessagesForPollIdQueryVariables>) {
          return Apollo.useLazyQuery<GetMessagesForPollIdQuery, GetMessagesForPollIdQueryVariables>(GetMessagesForPollIdDocument, baseOptions);
        }
export type GetMessagesForPollIdQueryHookResult = ReturnType<typeof useGetMessagesForPollIdQuery>;
export type GetMessagesForPollIdLazyQueryHookResult = ReturnType<typeof useGetMessagesForPollIdLazyQuery>;
export type GetMessagesForPollIdQueryResult = Apollo.QueryResult<GetMessagesForPollIdQuery, GetMessagesForPollIdQueryVariables>;
export const Nest_GetMewtwoByIdDocument = gql`
    query nest_getMewtwoById($id: String!, $locale: String, $location: String) {
  result: nest_getMewtwoById(id: $id, locale: $locale, location: $location) {
    id
    url
    title
    description
  }
}
    `;

/**
 * __useNest_GetMewtwoByIdQuery__
 *
 * To run a query within a React component, call `useNest_GetMewtwoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useNest_GetMewtwoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNest_GetMewtwoByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      locale: // value for 'locale'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useNest_GetMewtwoByIdQuery(baseOptions?: Apollo.QueryHookOptions<Nest_GetMewtwoByIdQuery, Nest_GetMewtwoByIdQueryVariables>) {
        return Apollo.useQuery<Nest_GetMewtwoByIdQuery, Nest_GetMewtwoByIdQueryVariables>(Nest_GetMewtwoByIdDocument, baseOptions);
      }
export function useNest_GetMewtwoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Nest_GetMewtwoByIdQuery, Nest_GetMewtwoByIdQueryVariables>) {
          return Apollo.useLazyQuery<Nest_GetMewtwoByIdQuery, Nest_GetMewtwoByIdQueryVariables>(Nest_GetMewtwoByIdDocument, baseOptions);
        }
export type Nest_GetMewtwoByIdQueryHookResult = ReturnType<typeof useNest_GetMewtwoByIdQuery>;
export type Nest_GetMewtwoByIdLazyQueryHookResult = ReturnType<typeof useNest_GetMewtwoByIdLazyQuery>;
export type Nest_GetMewtwoByIdQueryResult = Apollo.QueryResult<Nest_GetMewtwoByIdQuery, Nest_GetMewtwoByIdQueryVariables>;
export const GetPollByIdDocument = gql`
    query GetPollByID($id: uuid!, $offset: Int!, $limit: Int!) {
  poll: polls_by_pk(id: $id) @connection(key: "polls") {
    id
    name
    icon
    picture
    description
    type
    code
    isListFirst: is_list_first
    admin: created_by
    subpolls(order_by: {name: asc}) {
      id
      name
      icon
      webhooks {
        id
        url
        active
      }
    }
    parent: parent_poll {
      id
      name
      icon
      description
      type
      code
      picture
      subpolls(order_by: {name: asc}) {
        id
        name
        icon
      }
      users: users_in_poll(order_by: {created_at: desc}) {
        id
        user {
          ...User
        }
      }
    }
    users: users_in_poll(order_by: {created_at: desc}) {
      id
      user {
        ...User
      }
    }
    newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}}}, offset: $offset, limit: $limit) @connection(key: "links_in_poll", filter: ["offset"]) {
      id
      link {
        ...Link
      }
    }
    messages(limit: 1, order_by: {created_at: desc}) {
      id
      recipients: messages_recipients(order_by: {received_at: desc}) {
        id
        user {
          id
        }
        read_at
      }
    }
    webhooks {
      id
      url
      active
    }
  }
}
    ${UserFragmentDoc}
${LinkFragmentDoc}`;

/**
 * __useGetPollByIdQuery__
 *
 * To run a query within a React component, call `useGetPollByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPollByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPollByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPollByIdQuery, GetPollByIdQueryVariables>) {
        return Apollo.useQuery<GetPollByIdQuery, GetPollByIdQueryVariables>(GetPollByIdDocument, baseOptions);
      }
export function useGetPollByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPollByIdQuery, GetPollByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPollByIdQuery, GetPollByIdQueryVariables>(GetPollByIdDocument, baseOptions);
        }
export type GetPollByIdQueryHookResult = ReturnType<typeof useGetPollByIdQuery>;
export type GetPollByIdLazyQueryHookResult = ReturnType<typeof useGetPollByIdLazyQuery>;
export type GetPollByIdQueryResult = Apollo.QueryResult<GetPollByIdQuery, GetPollByIdQueryVariables>;
export const GetPollMetadataByIdDocument = gql`
    query GetPollMetadataByID($id: uuid!) {
  poll: polls_by_pk(id: $id) @connection(key: "polls", filter: ["id"]) {
    id
    name
    icon
    description
    type
    code
    parent: parent_poll {
      id
      name
      icon
      description
      type
      code
    }
  }
}
    `;

/**
 * __useGetPollMetadataByIdQuery__
 *
 * To run a query within a React component, call `useGetPollMetadataByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPollMetadataByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollMetadataByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPollMetadataByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPollMetadataByIdQuery, GetPollMetadataByIdQueryVariables>) {
        return Apollo.useQuery<GetPollMetadataByIdQuery, GetPollMetadataByIdQueryVariables>(GetPollMetadataByIdDocument, baseOptions);
      }
export function useGetPollMetadataByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPollMetadataByIdQuery, GetPollMetadataByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPollMetadataByIdQuery, GetPollMetadataByIdQueryVariables>(GetPollMetadataByIdDocument, baseOptions);
        }
export type GetPollMetadataByIdQueryHookResult = ReturnType<typeof useGetPollMetadataByIdQuery>;
export type GetPollMetadataByIdLazyQueryHookResult = ReturnType<typeof useGetPollMetadataByIdLazyQuery>;
export type GetPollMetadataByIdQueryResult = Apollo.QueryResult<GetPollMetadataByIdQuery, GetPollMetadataByIdQueryVariables>;
export const GetPollNameByIdDocument = gql`
    query GetPollNameByID($id: String!, $code: String!) {
  poll: nest_getPollName(id: $id, code: $code) {
    id
    name
    type
  }
}
    `;

/**
 * __useGetPollNameByIdQuery__
 *
 * To run a query within a React component, call `useGetPollNameByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPollNameByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollNameByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetPollNameByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPollNameByIdQuery, GetPollNameByIdQueryVariables>) {
        return Apollo.useQuery<GetPollNameByIdQuery, GetPollNameByIdQueryVariables>(GetPollNameByIdDocument, baseOptions);
      }
export function useGetPollNameByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPollNameByIdQuery, GetPollNameByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPollNameByIdQuery, GetPollNameByIdQueryVariables>(GetPollNameByIdDocument, baseOptions);
        }
export type GetPollNameByIdQueryHookResult = ReturnType<typeof useGetPollNameByIdQuery>;
export type GetPollNameByIdLazyQueryHookResult = ReturnType<typeof useGetPollNameByIdLazyQuery>;
export type GetPollNameByIdQueryResult = Apollo.QueryResult<GetPollNameByIdQuery, GetPollNameByIdQueryVariables>;
export const GetPollsForUserIdDocument = gql`
    query GetPollsForUserId($userId: uuid!, $offset: Int!, $limit: Int!) {
  user: users_by_pk(id: $userId) {
    id
    polls: users_polls(order_by: {poll: {updated_at: desc, messages_aggregate: {max: {updated_at: desc_nulls_last}}, links_in_poll_aggregate: {max: {updated_at: desc_nulls_last}}}}, offset: $offset, limit: $limit) @connection(key: "users_polls") {
      id
      poll {
        id
        name
        picture
        description
        type
        isListFirst: is_list_first
        subpolls(order_by: {name: asc}) {
          id
        }
        users: users_in_poll {
          id
          user {
            ...User
          }
        }
        newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}}}, limit: 1) {
          id
          link {
            id
            comments(where: {recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
              id
              recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
                id
                read_at
              }
            }
          }
        }
        messages(where: {messages_recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
          id
          recipients: messages_recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
            id
            read_at
          }
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetPollsForUserIdQuery__
 *
 * To run a query within a React component, call `useGetPollsForUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPollsForUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollsForUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPollsForUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPollsForUserIdQuery, GetPollsForUserIdQueryVariables>) {
        return Apollo.useQuery<GetPollsForUserIdQuery, GetPollsForUserIdQueryVariables>(GetPollsForUserIdDocument, baseOptions);
      }
export function useGetPollsForUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPollsForUserIdQuery, GetPollsForUserIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPollsForUserIdQuery, GetPollsForUserIdQueryVariables>(GetPollsForUserIdDocument, baseOptions);
        }
export type GetPollsForUserIdQueryHookResult = ReturnType<typeof useGetPollsForUserIdQuery>;
export type GetPollsForUserIdLazyQueryHookResult = ReturnType<typeof useGetPollsForUserIdLazyQuery>;
export type GetPollsForUserIdQueryResult = Apollo.QueryResult<GetPollsForUserIdQuery, GetPollsForUserIdQueryVariables>;
export const GetPollsWithSubpollsForUserIdDocument = gql`
    query GetPollsWithSubpollsForUserId($userId: uuid!) {
  polls: users_polls(where: {user_id: {_eq: $userId}}, order_by: {poll: {updated_at: desc, messages_aggregate: {max: {updated_at: desc_nulls_first}}, links_in_poll_aggregate: {max: {updated_at: desc_nulls_first}}}}) {
    id
    poll {
      id
      name
      icon
      picture
      description
      type
      subpolls(order_by: {name: asc}) {
        id
        name
        icon
      }
      users: users_in_poll {
        id
        user {
          ...User
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetPollsWithSubpollsForUserIdQuery__
 *
 * To run a query within a React component, call `useGetPollsWithSubpollsForUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPollsWithSubpollsForUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollsWithSubpollsForUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPollsWithSubpollsForUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPollsWithSubpollsForUserIdQuery, GetPollsWithSubpollsForUserIdQueryVariables>) {
        return Apollo.useQuery<GetPollsWithSubpollsForUserIdQuery, GetPollsWithSubpollsForUserIdQueryVariables>(GetPollsWithSubpollsForUserIdDocument, baseOptions);
      }
export function useGetPollsWithSubpollsForUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPollsWithSubpollsForUserIdQuery, GetPollsWithSubpollsForUserIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPollsWithSubpollsForUserIdQuery, GetPollsWithSubpollsForUserIdQueryVariables>(GetPollsWithSubpollsForUserIdDocument, baseOptions);
        }
export type GetPollsWithSubpollsForUserIdQueryHookResult = ReturnType<typeof useGetPollsWithSubpollsForUserIdQuery>;
export type GetPollsWithSubpollsForUserIdLazyQueryHookResult = ReturnType<typeof useGetPollsWithSubpollsForUserIdLazyQuery>;
export type GetPollsWithSubpollsForUserIdQueryResult = Apollo.QueryResult<GetPollsWithSubpollsForUserIdQuery, GetPollsWithSubpollsForUserIdQueryVariables>;
export const GetPublicPollsDocument = gql`
    query GetPublicPolls {
  polls(where: {_or: {type: {_eq: "public"}}}) {
    id
  }
}
    `;

/**
 * __useGetPublicPollsQuery__
 *
 * To run a query within a React component, call `useGetPublicPollsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicPollsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicPollsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPublicPollsQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicPollsQuery, GetPublicPollsQueryVariables>) {
        return Apollo.useQuery<GetPublicPollsQuery, GetPublicPollsQueryVariables>(GetPublicPollsDocument, baseOptions);
      }
export function useGetPublicPollsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicPollsQuery, GetPublicPollsQueryVariables>) {
          return Apollo.useLazyQuery<GetPublicPollsQuery, GetPublicPollsQueryVariables>(GetPublicPollsDocument, baseOptions);
        }
export type GetPublicPollsQueryHookResult = ReturnType<typeof useGetPublicPollsQuery>;
export type GetPublicPollsLazyQueryHookResult = ReturnType<typeof useGetPublicPollsLazyQuery>;
export type GetPublicPollsQueryResult = Apollo.QueryResult<GetPublicPollsQuery, GetPublicPollsQueryVariables>;
export const GetPublicSubpollsDocument = gql`
    query GetPublicSubpolls {
  polls(where: {_or: {parent_poll: {type: {_eq: "public"}}}}) {
    id
  }
}
    `;

/**
 * __useGetPublicSubpollsQuery__
 *
 * To run a query within a React component, call `useGetPublicSubpollsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicSubpollsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicSubpollsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPublicSubpollsQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicSubpollsQuery, GetPublicSubpollsQueryVariables>) {
        return Apollo.useQuery<GetPublicSubpollsQuery, GetPublicSubpollsQueryVariables>(GetPublicSubpollsDocument, baseOptions);
      }
export function useGetPublicSubpollsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicSubpollsQuery, GetPublicSubpollsQueryVariables>) {
          return Apollo.useLazyQuery<GetPublicSubpollsQuery, GetPublicSubpollsQueryVariables>(GetPublicSubpollsDocument, baseOptions);
        }
export type GetPublicSubpollsQueryHookResult = ReturnType<typeof useGetPublicSubpollsQuery>;
export type GetPublicSubpollsLazyQueryHookResult = ReturnType<typeof useGetPublicSubpollsLazyQuery>;
export type GetPublicSubpollsQueryResult = Apollo.QueryResult<GetPublicSubpollsQuery, GetPublicSubpollsQueryVariables>;
export const GetSubpollsForLinkIdDocument = gql`
    query GetSubpollsForLinkId($id: uuid!) {
  link: links_by_pk(id: $id) {
    id
    subpolls: polls(where: {poll: {type: {_eq: "sub"}}}) {
      id
      poll {
        id
        icon
        name
      }
    }
  }
}
    `;

/**
 * __useGetSubpollsForLinkIdQuery__
 *
 * To run a query within a React component, call `useGetSubpollsForLinkIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubpollsForLinkIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubpollsForLinkIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSubpollsForLinkIdQuery(baseOptions?: Apollo.QueryHookOptions<GetSubpollsForLinkIdQuery, GetSubpollsForLinkIdQueryVariables>) {
        return Apollo.useQuery<GetSubpollsForLinkIdQuery, GetSubpollsForLinkIdQueryVariables>(GetSubpollsForLinkIdDocument, baseOptions);
      }
export function useGetSubpollsForLinkIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubpollsForLinkIdQuery, GetSubpollsForLinkIdQueryVariables>) {
          return Apollo.useLazyQuery<GetSubpollsForLinkIdQuery, GetSubpollsForLinkIdQueryVariables>(GetSubpollsForLinkIdDocument, baseOptions);
        }
export type GetSubpollsForLinkIdQueryHookResult = ReturnType<typeof useGetSubpollsForLinkIdQuery>;
export type GetSubpollsForLinkIdLazyQueryHookResult = ReturnType<typeof useGetSubpollsForLinkIdLazyQuery>;
export type GetSubpollsForLinkIdQueryResult = Apollo.QueryResult<GetSubpollsForLinkIdQuery, GetSubpollsForLinkIdQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: uuid!) {
  user: users_by_pk(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserIsFollowingPollForUserIdDocument = gql`
    query GetUserIsFollowingPollForUserId($userId: uuid!, $pollId: uuid!) {
  isFollowingPoll: users_followed_polls(where: {user_id: {_eq: $userId}, poll_id: {_eq: $pollId}}) {
    id
  }
}
    `;

/**
 * __useGetUserIsFollowingPollForUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserIsFollowingPollForUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIsFollowingPollForUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIsFollowingPollForUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useGetUserIsFollowingPollForUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserIsFollowingPollForUserIdQuery, GetUserIsFollowingPollForUserIdQueryVariables>) {
        return Apollo.useQuery<GetUserIsFollowingPollForUserIdQuery, GetUserIsFollowingPollForUserIdQueryVariables>(GetUserIsFollowingPollForUserIdDocument, baseOptions);
      }
export function useGetUserIsFollowingPollForUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIsFollowingPollForUserIdQuery, GetUserIsFollowingPollForUserIdQueryVariables>) {
          return Apollo.useLazyQuery<GetUserIsFollowingPollForUserIdQuery, GetUserIsFollowingPollForUserIdQueryVariables>(GetUserIsFollowingPollForUserIdDocument, baseOptions);
        }
export type GetUserIsFollowingPollForUserIdQueryHookResult = ReturnType<typeof useGetUserIsFollowingPollForUserIdQuery>;
export type GetUserIsFollowingPollForUserIdLazyQueryHookResult = ReturnType<typeof useGetUserIsFollowingPollForUserIdLazyQuery>;
export type GetUserIsFollowingPollForUserIdQueryResult = Apollo.QueryResult<GetUserIsFollowingPollForUserIdQuery, GetUserIsFollowingPollForUserIdQueryVariables>;
export const GetCommentsForLinkIdSubDocument = gql`
    subscription GetCommentsForLinkIdSub($id: uuid!, $offset: Int, $limit: Int) {
  link: links(where: {id: {_eq: $id}}) {
    id
    name
    title
    comments(order_by: {created_at: desc}, offset: $offset, limit: $limit) @connection(key: "comments") {
      ...Comment
    }
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useGetCommentsForLinkIdSubSubscription__
 *
 * To run a query within a React component, call `useGetCommentsForLinkIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsForLinkIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsForLinkIdSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetCommentsForLinkIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetCommentsForLinkIdSubSubscription, GetCommentsForLinkIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetCommentsForLinkIdSubSubscription, GetCommentsForLinkIdSubSubscriptionVariables>(GetCommentsForLinkIdSubDocument, baseOptions);
      }
export type GetCommentsForLinkIdSubSubscriptionHookResult = ReturnType<typeof useGetCommentsForLinkIdSubSubscription>;
export type GetCommentsForLinkIdSubSubscriptionResult = Apollo.SubscriptionResult<GetCommentsForLinkIdSubSubscription>;
export const GetFollowedPollsForUserIdSubDocument = gql`
    subscription GetFollowedPollsForUserIdSub($userId: uuid!, $offset: Int!, $limit: Int!) {
  polls: users_followed_polls(where: {user_id: {_eq: $userId}}, order_by: {poll: {updated_at: desc, messages_aggregate: {max: {updated_at: desc_nulls_last}}, links_in_poll_aggregate: {max: {updated_at: desc_nulls_last}}}}, offset: $offset, limit: $limit) {
    id
    poll {
      id
      name
      description
      users: users_in_poll {
        id
        user {
          ...User
        }
      }
      newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}}}, limit: 1) {
        id
        link {
          id
          comments(where: {recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
            id
            recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
              id
              read_at
            }
          }
        }
      }
      messages(where: {messages_recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
        id
        recipients: messages_recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
          id
          read_at
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetFollowedPollsForUserIdSubSubscription__
 *
 * To run a query within a React component, call `useGetFollowedPollsForUserIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowedPollsForUserIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowedPollsForUserIdSubSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetFollowedPollsForUserIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetFollowedPollsForUserIdSubSubscription, GetFollowedPollsForUserIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetFollowedPollsForUserIdSubSubscription, GetFollowedPollsForUserIdSubSubscriptionVariables>(GetFollowedPollsForUserIdSubDocument, baseOptions);
      }
export type GetFollowedPollsForUserIdSubSubscriptionHookResult = ReturnType<typeof useGetFollowedPollsForUserIdSubSubscription>;
export type GetFollowedPollsForUserIdSubSubscriptionResult = Apollo.SubscriptionResult<GetFollowedPollsForUserIdSubSubscription>;
export const GetLinkByIdSubDocument = gql`
    subscription GetLinkByIdSub($id: uuid!) {
  link: links_by_pk(id: $id) {
    ...Link
  }
}
    ${LinkFragmentDoc}`;

/**
 * __useGetLinkByIdSubSubscription__
 *
 * To run a query within a React component, call `useGetLinkByIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkByIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkByIdSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLinkByIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetLinkByIdSubSubscription, GetLinkByIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetLinkByIdSubSubscription, GetLinkByIdSubSubscriptionVariables>(GetLinkByIdSubDocument, baseOptions);
      }
export type GetLinkByIdSubSubscriptionHookResult = ReturnType<typeof useGetLinkByIdSubSubscription>;
export type GetLinkByIdSubSubscriptionResult = Apollo.SubscriptionResult<GetLinkByIdSubSubscription>;
export const GetLinkImageByIdSubDocument = gql`
    subscription GetLinkImageByIdSub($id: uuid!) {
  link: links_by_pk(id: $id) {
    id
    image
  }
}
    `;

/**
 * __useGetLinkImageByIdSubSubscription__
 *
 * To run a query within a React component, call `useGetLinkImageByIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkImageByIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkImageByIdSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLinkImageByIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetLinkImageByIdSubSubscription, GetLinkImageByIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetLinkImageByIdSubSubscription, GetLinkImageByIdSubSubscriptionVariables>(GetLinkImageByIdSubDocument, baseOptions);
      }
export type GetLinkImageByIdSubSubscriptionHookResult = ReturnType<typeof useGetLinkImageByIdSubSubscription>;
export type GetLinkImageByIdSubSubscriptionResult = Apollo.SubscriptionResult<GetLinkImageByIdSubSubscription>;
export const GetMessagesAndLinksForPollIdSubDocument = gql`
    subscription GetMessagesAndLinksForPollIdSub($id: uuid!, $offset: Int, $limit: Int) {
  poll: polls_by_pk(id: $id) {
    id
    name
    messages_and_links(offset: $offset, limit: $limit) @connection(key: "messages_and_links") {
      type
      links {
        ...Link
      }
      messages @connection(key: "messages") {
        ...Message
      }
    }
  }
}
    ${LinkFragmentDoc}
${MessageFragmentDoc}`;

/**
 * __useGetMessagesAndLinksForPollIdSubSubscription__
 *
 * To run a query within a React component, call `useGetMessagesAndLinksForPollIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesAndLinksForPollIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesAndLinksForPollIdSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesAndLinksForPollIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetMessagesAndLinksForPollIdSubSubscription, GetMessagesAndLinksForPollIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetMessagesAndLinksForPollIdSubSubscription, GetMessagesAndLinksForPollIdSubSubscriptionVariables>(GetMessagesAndLinksForPollIdSubDocument, baseOptions);
      }
export type GetMessagesAndLinksForPollIdSubSubscriptionHookResult = ReturnType<typeof useGetMessagesAndLinksForPollIdSubSubscription>;
export type GetMessagesAndLinksForPollIdSubSubscriptionResult = Apollo.SubscriptionResult<GetMessagesAndLinksForPollIdSubSubscription>;
export const GetMessagesForPollIdSubDocument = gql`
    subscription GetMessagesForPollIdSub($id: uuid!, $offset: Int, $limit: Int) {
  poll: polls_by_pk(id: $id) {
    id
    name
    messages(order_by: {created_at: desc}, offset: $offset, limit: $limit) @connection(key: "messages") {
      ...Message
    }
  }
}
    ${MessageFragmentDoc}`;

/**
 * __useGetMessagesForPollIdSubSubscription__
 *
 * To run a query within a React component, call `useGetMessagesForPollIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesForPollIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesForPollIdSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesForPollIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetMessagesForPollIdSubSubscription, GetMessagesForPollIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetMessagesForPollIdSubSubscription, GetMessagesForPollIdSubSubscriptionVariables>(GetMessagesForPollIdSubDocument, baseOptions);
      }
export type GetMessagesForPollIdSubSubscriptionHookResult = ReturnType<typeof useGetMessagesForPollIdSubSubscription>;
export type GetMessagesForPollIdSubSubscriptionResult = Apollo.SubscriptionResult<GetMessagesForPollIdSubSubscription>;
export const GetPollByIdSubDocument = gql`
    subscription GetPollByIDSub($id: uuid!, $offset: Int!, $limit: Int!) {
  poll: polls_by_pk(id: $id) @connection(key: "polls") {
    id
    name
    icon
    description
    code
    isListFirst: is_list_first
    subpolls(order_by: {name: asc}) {
      id
      name
      icon
    }
    users: users_in_poll(order_by: {created_at: desc}) {
      id
      user {
        ...User
      }
    }
    newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}}}, offset: $offset, limit: $limit) @connection(key: "links_in_poll", filter: ["offset"]) {
      id
      link {
        ...Link
      }
    }
    messages(limit: 1, order_by: {created_at: desc}) {
      id
      recipients: messages_recipients(order_by: {received_at: desc}) {
        id
        user {
          id
        }
        read_at
      }
    }
  }
}
    ${UserFragmentDoc}
${LinkFragmentDoc}`;

/**
 * __useGetPollByIdSubSubscription__
 *
 * To run a query within a React component, call `useGetPollByIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetPollByIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollByIdSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPollByIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetPollByIdSubSubscription, GetPollByIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetPollByIdSubSubscription, GetPollByIdSubSubscriptionVariables>(GetPollByIdSubDocument, baseOptions);
      }
export type GetPollByIdSubSubscriptionHookResult = ReturnType<typeof useGetPollByIdSubSubscription>;
export type GetPollByIdSubSubscriptionResult = Apollo.SubscriptionResult<GetPollByIdSubSubscription>;
export const GetPollsForUserIdSubDocument = gql`
    subscription GetPollsForUserIdSub($userId: uuid!, $offset: Int!, $limit: Int!) {
  user: users_by_pk(id: $userId) {
    id
    polls: users_polls(order_by: {poll: {updated_at: desc, messages_aggregate: {max: {updated_at: desc_nulls_last}}, links_in_poll_aggregate: {max: {updated_at: desc_nulls_last}}}}, offset: $offset, limit: $limit) @connection(key: "users_polls") {
      id
      poll {
        id
        name
        description
        isListFirst: is_list_first
        users: users_in_poll {
          id
          user {
            ...User
          }
        }
        newLinks: links_in_poll(order_by: {link: {updated_at: desc}}, where: {link: {deleted_at: {_is_null: true}}}, limit: 1) {
          id
          link {
            id
            comments(where: {recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
              id
              recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
                id
                read_at
              }
            }
          }
        }
        messages(where: {messages_recipients: {user_id: {_eq: $userId}}}, limit: 1, order_by: {created_at: desc}) {
          id
          recipients: messages_recipients(order_by: {received_at: desc}, where: {user_id: {_eq: $userId}}) {
            id
            read_at
          }
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetPollsForUserIdSubSubscription__
 *
 * To run a query within a React component, call `useGetPollsForUserIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetPollsForUserIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollsForUserIdSubSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPollsForUserIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetPollsForUserIdSubSubscription, GetPollsForUserIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetPollsForUserIdSubSubscription, GetPollsForUserIdSubSubscriptionVariables>(GetPollsForUserIdSubDocument, baseOptions);
      }
export type GetPollsForUserIdSubSubscriptionHookResult = ReturnType<typeof useGetPollsForUserIdSubSubscription>;
export type GetPollsForUserIdSubSubscriptionResult = Apollo.SubscriptionResult<GetPollsForUserIdSubSubscription>;
export const GetPollsWithSubpollsForUserIdSubDocument = gql`
    subscription GetPollsWithSubpollsForUserIdSub($userId: uuid!) {
  polls: users_polls(where: {user_id: {_eq: $userId}}, order_by: {poll: {updated_at: desc, messages_aggregate: {max: {updated_at: desc_nulls_first}}, links_in_poll_aggregate: {max: {updated_at: desc_nulls_first}}}}) {
    id
    poll {
      id
      name
      icon
      description
      subpolls(order_by: {name: asc}) {
        id
        name
        icon
      }
      users: users_in_poll {
        id
        user {
          ...User
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetPollsWithSubpollsForUserIdSubSubscription__
 *
 * To run a query within a React component, call `useGetPollsWithSubpollsForUserIdSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetPollsWithSubpollsForUserIdSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPollsWithSubpollsForUserIdSubSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPollsWithSubpollsForUserIdSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetPollsWithSubpollsForUserIdSubSubscription, GetPollsWithSubpollsForUserIdSubSubscriptionVariables>) {
        return Apollo.useSubscription<GetPollsWithSubpollsForUserIdSubSubscription, GetPollsWithSubpollsForUserIdSubSubscriptionVariables>(GetPollsWithSubpollsForUserIdSubDocument, baseOptions);
      }
export type GetPollsWithSubpollsForUserIdSubSubscriptionHookResult = ReturnType<typeof useGetPollsWithSubpollsForUserIdSubSubscription>;
export type GetPollsWithSubpollsForUserIdSubSubscriptionResult = Apollo.SubscriptionResult<GetPollsWithSubpollsForUserIdSubSubscription>;
export type UserFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'id' | 'first_name' | 'last_name' | 'picture' | 'color' | 'last_seen_at' | 'locale'>
);

export type CurrentUserFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'email' | 'premium'>
  & { blocking: Array<(
    { __typename?: 'blocked_users' }
    & Pick<Blocked_Users, 'id' | 'user_id'>
  )> }
  & UserFragment
);

export type CommentFragment = (
  { __typename?: 'comments' }
  & Pick<Comments, 'id' | 'text' | 'created_at'>
  & { user: (
    { __typename?: 'users' }
    & UserFragment
  ), recipients: Array<(
    { __typename?: 'recipients' }
    & RecipientsFragment
  )>, attachments: Array<(
    { __typename?: 'comments_attachments' }
    & CommentAttachmentsFragment
  )> }
);

export type MessageFragment = (
  { __typename?: 'messages' }
  & Pick<Messages, 'id' | 'text' | 'created_at'>
  & { user: (
    { __typename?: 'users' }
    & UserFragment
  ), recipients: Array<(
    { __typename?: 'messages_recipients' }
    & MessageRecipientsFragment
  )>, attachments: Array<(
    { __typename?: 'messages_attachments' }
    & MessageAttachmentsFragment
  )> }
);

export type LinkFragment = (
  { __typename?: 'links' }
  & Pick<Links, 'id' | 'url' | 'title' | 'description' | 'image' | 'note' | 'name' | 'created_at' | 'happened_at'>
  & { upvotes: Array<(
    { __typename?: 'upvotes' }
    & Pick<Upvotes, 'id' | 'created_at'>
    & { user: (
      { __typename?: 'users' }
      & UserFragment
    ) }
  )>, upvotes_aggregate: (
    { __typename?: 'upvotes_aggregate' }
    & { aggregate: Maybe<(
      { __typename?: 'upvotes_aggregate_fields' }
      & Pick<Upvotes_Aggregate_Fields, 'count'>
    )> }
  ), comments: Array<(
    { __typename?: 'comments' }
    & Pick<Comments, 'id'>
    & { recipients: Array<(
      { __typename?: 'recipients' }
      & Pick<Recipients, 'id' | 'read_at'>
      & { user: (
        { __typename?: 'users' }
        & Pick<Users, 'id'>
      ) }
    )> }
  )>, comments_aggregate: (
    { __typename?: 'comments_aggregate' }
    & { aggregate: Maybe<(
      { __typename?: 'comments_aggregate_fields' }
      & Pick<Comments_Aggregate_Fields, 'count'>
    )> }
  ), user: (
    { __typename?: 'users' }
    & UserFragment
  ), recipients: Array<(
    { __typename?: 'links_recipients' }
    & LinkRecipientsFragment
  )>, attachments: Array<(
    { __typename?: 'links_attachments' }
    & LinkAttachmentsFragment
  )> }
);

export type RecipientsFragment = (
  { __typename?: 'recipients' }
  & Pick<Recipients, 'id' | 'received_at' | 'read_at'>
  & { user: (
    { __typename?: 'users' }
    & UserFragment
  ) }
);

export type MessageRecipientsFragment = (
  { __typename?: 'messages_recipients' }
  & Pick<Messages_Recipients, 'id' | 'received_at' | 'read_at'>
  & { user: (
    { __typename?: 'users' }
    & UserFragment
  ) }
);

export type LinkRecipientsFragment = (
  { __typename?: 'links_recipients' }
  & Pick<Links_Recipients, 'id' | 'received_at' | 'read_at'>
  & { user: (
    { __typename?: 'users' }
    & UserFragment
  ) }
);

export type PollFragment = (
  { __typename?: 'polls' }
  & Pick<Polls, 'id' | 'name'>
  & { messages_and_links: Maybe<Array<(
    { __typename?: 'messages_and_links' }
    & Pick<Messages_And_Links, 'type'>
    & { links: (
      { __typename?: 'links' }
      & LinkFragment
    ), messages: (
      { __typename?: 'messages' }
      & MessageFragment
    ) }
  )>> }
);

export type MessageAttachmentsFragment = (
  { __typename?: 'messages_attachments' }
  & Pick<Messages_Attachments, 'id' | 'file_id' | 'type' | 'url'>
);

export type CommentAttachmentsFragment = (
  { __typename?: 'comments_attachments' }
  & Pick<Comments_Attachments, 'id' | 'file_id' | 'type' | 'url'>
);

export type LinkAttachmentsFragment = (
  { __typename?: 'links_attachments' }
  & Pick<Links_Attachments, 'id' | 'file_id' | 'type' | 'url'>
);

export type AddCommentAttachmentMutationVariables = Exact<{
  userId: Scalars['uuid'];
  fileId: Scalars['uuid'];
  commentId: Scalars['uuid'];
  type: Scalars['String'];
  url: Scalars['String'];
}>;


export type AddCommentAttachmentMutation = (
  { __typename?: 'mutation_root' }
  & { insert_comments_attachments: Maybe<(
    { __typename?: 'comments_attachments_mutation_response' }
    & { returning: Array<(
      { __typename?: 'comments_attachments' }
      & Pick<Comments_Attachments, 'id'>
    )> }
  )> }
);

export type AddCommentMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  pollId: Scalars['uuid'];
  userId: Scalars['uuid'];
  text: Scalars['String'];
  now: Scalars['timestamptz'];
}>;


export type AddCommentMutation = (
  { __typename?: 'mutation_root' }
  & { insert_comments: Maybe<(
    { __typename?: 'comments_mutation_response' }
    & { returning: Array<(
      { __typename?: 'comments' }
      & CommentFragment
    )> }
  )>, update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )>, update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type AddLinkAttachmentMutationVariables = Exact<{
  userId: Scalars['uuid'];
  fileId: Scalars['uuid'];
  linkId: Scalars['uuid'];
  type: Scalars['String'];
  url: Scalars['String'];
  now: Scalars['timestamptz'];
}>;


export type AddLinkAttachmentMutation = (
  { __typename?: 'mutation_root' }
  & { insert_links_attachments: Maybe<(
    { __typename?: 'links_attachments_mutation_response' }
    & { returning: Array<(
      { __typename?: 'links_attachments' }
      & Pick<Links_Attachments, 'id'>
    )> }
  )>, update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type AddLinkToPollMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  pollId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type AddLinkToPollMutation = (
  { __typename?: 'mutation_root' }
  & { result: Maybe<(
    { __typename?: 'links_polls_mutation_response' }
    & { linkInPoll: Array<(
      { __typename?: 'links_polls' }
      & Pick<Links_Polls, 'id'>
    )> }
  )>, update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type AddLinkMutationVariables = Exact<{
  userId: Scalars['uuid'];
  url: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
}>;


export type AddLinkMutation = (
  { __typename?: 'mutation_root' }
  & { result: Maybe<(
    { __typename?: 'links_mutation_response' }
    & { link: Array<(
      { __typename?: 'links' }
      & LinkFragment
    )> }
  )> }
);

export type AddMessageAttachmentMutationVariables = Exact<{
  userId: Scalars['uuid'];
  fileId: Scalars['uuid'];
  messageId: Scalars['uuid'];
  type: Scalars['String'];
  url: Scalars['String'];
}>;


export type AddMessageAttachmentMutation = (
  { __typename?: 'mutation_root' }
  & { insert_messages_attachments: Maybe<(
    { __typename?: 'messages_attachments_mutation_response' }
    & { returning: Array<(
      { __typename?: 'messages_attachments' }
      & Pick<Messages_Attachments, 'id'>
    )> }
  )> }
);

export type AddMessageRecipientsMutationVariables = Exact<{
  userId: Scalars['uuid'];
  messageId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type AddMessageRecipientsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_messages_recipients: Maybe<(
    { __typename?: 'messages_recipients_mutation_response' }
    & { returning: Array<(
      { __typename?: 'messages_recipients' }
      & MessageRecipientsFragment
    )> }
  )> }
);

export type AddMessageMutationVariables = Exact<{
  pollId: Scalars['uuid'];
  userId: Scalars['uuid'];
  text: Scalars['String'];
  now: Scalars['timestamptz'];
}>;


export type AddMessageMutation = (
  { __typename?: 'mutation_root' }
  & { insert_messages: Maybe<(
    { __typename?: 'messages_mutation_response' }
    & { returning: Array<(
      { __typename?: 'messages' }
      & MessageFragment
    )> }
  )>, update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type AddRecipientsMutationVariables = Exact<{
  userId: Scalars['uuid'];
  commentId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type AddRecipientsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_recipients: Maybe<(
    { __typename?: 'recipients_mutation_response' }
    & { returning: Array<(
      { __typename?: 'recipients' }
      & RecipientsFragment
    )> }
  )> }
);

export type AddUserToPollMutationVariables = Exact<{
  userId: Scalars['uuid'];
  pollId: Scalars['uuid'];
}>;


export type AddUserToPollMutation = (
  { __typename?: 'mutation_root' }
  & { insert_users_polls: Maybe<(
    { __typename?: 'users_polls_mutation_response' }
    & { returning: Array<(
      { __typename?: 'users_polls' }
      & Pick<Users_Polls, 'id'>
    )> }
  )> }
);

export type BlockUserMutationVariables = Exact<{
  userId: Scalars['uuid'];
  blockedBy: Scalars['uuid'];
}>;


export type BlockUserMutation = (
  { __typename?: 'mutation_root' }
  & { insert_blocked_users_one: Maybe<(
    { __typename?: 'blocked_users' }
    & Pick<Blocked_Users, 'id'>
  )> }
);

export type CreatePollMutationVariables = Exact<{
  name: Scalars['String'];
  userId: Scalars['uuid'];
}>;


export type CreatePollMutation = (
  { __typename?: 'mutation_root' }
  & { insert_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & { returning: Array<(
      { __typename?: 'polls' }
      & Pick<Polls, 'id'>
    )> }
  )> }
);

export type CreateReminderMutationVariables = Exact<{
  userId: Scalars['uuid'];
  linkId: Scalars['uuid'];
  pollId: Scalars['uuid'];
  sendToGroup: Scalars['Boolean'];
  sendAt: Scalars['timestamptz'];
}>;


export type CreateReminderMutation = (
  { __typename?: 'mutation_root' }
  & { insert_reminders: Maybe<(
    { __typename?: 'reminders_mutation_response' }
    & { returning: Array<(
      { __typename?: 'reminders' }
      & Pick<Reminders, 'id'>
    )> }
  )> }
);

export type CreateSubpollMutationVariables = Exact<{
  name: Scalars['String'];
  icon: Scalars['String'];
  userId: Scalars['uuid'];
  pollParentId: Scalars['uuid'];
}>;


export type CreateSubpollMutation = (
  { __typename?: 'mutation_root' }
  & { result: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & { subpoll: Array<(
      { __typename?: 'polls' }
      & Pick<Polls, 'id'>
    )> }
  )> }
);

export type CreateWebhookMutationVariables = Exact<{
  userId: Scalars['uuid'];
  pollId: Scalars['uuid'];
  url: Scalars['String'];
}>;


export type CreateWebhookMutation = (
  { __typename?: 'mutation_root' }
  & { insert_webhooks: Maybe<(
    { __typename?: 'webhooks_mutation_response' }
    & { returning: Array<(
      { __typename?: 'webhooks' }
      & Pick<Webhooks, 'id'>
    )> }
  )> }
);

export type DeleteDownvoteMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  userId: Scalars['uuid'];
}>;


export type DeleteDownvoteMutation = (
  { __typename?: 'mutation_root' }
  & { delete_downvotes: Maybe<(
    { __typename?: 'downvotes_mutation_response' }
    & Pick<Downvotes_Mutation_Response, 'affected_rows'>
  )> }
);

export type DeleteImageFromLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
}>;


export type DeleteImageFromLinkMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type DeleteLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type DeleteLinkMutation = (
  { __typename?: 'mutation_root' }
  & { update_links_by_pk: Maybe<(
    { __typename?: 'links' }
    & Pick<Links, 'deleted_at'>
  )> }
);

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'mutation_root' }
  & { update_messages_by_pk: Maybe<(
    { __typename?: 'messages' }
    & Pick<Messages, 'deleted_at'>
  )> }
);

export type DeleteSubpollMutationVariables = Exact<{
  pollId: Scalars['uuid'];
}>;


export type DeleteSubpollMutation = (
  { __typename?: 'mutation_root' }
  & { delete_links_polls: Maybe<(
    { __typename?: 'links_polls_mutation_response' }
    & Pick<Links_Polls_Mutation_Response, 'affected_rows'>
  )>, delete_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type DeleteUpvoteMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  userId: Scalars['uuid'];
}>;


export type DeleteUpvoteMutation = (
  { __typename?: 'mutation_root' }
  & { delete_upvotes: Maybe<(
    { __typename?: 'upvotes_mutation_response' }
    & Pick<Upvotes_Mutation_Response, 'affected_rows'>
  )> }
);

export type DownvoteLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  userId: Scalars['uuid'];
}>;


export type DownvoteLinkMutation = (
  { __typename?: 'mutation_root' }
  & { delete_upvotes: Maybe<(
    { __typename?: 'upvotes_mutation_response' }
    & Pick<Upvotes_Mutation_Response, 'affected_rows'>
  )>, insert_downvotes: Maybe<(
    { __typename?: 'downvotes_mutation_response' }
    & { returning: Array<(
      { __typename?: 'downvotes' }
      & Pick<Downvotes, 'id' | 'created_at'>
      & { user: (
        { __typename?: 'users' }
        & UserFragment
      ) }
    )> }
  )> }
);

export type FollowPollMutationVariables = Exact<{
  userId: Scalars['uuid'];
  pollId: Scalars['uuid'];
}>;


export type FollowPollMutation = (
  { __typename?: 'mutation_root' }
  & { insert_users_followed_polls: Maybe<(
    { __typename?: 'users_followed_polls_mutation_response' }
    & { returning: Array<(
      { __typename?: 'users_followed_polls' }
      & Pick<Users_Followed_Polls, 'id'>
    )> }
  )> }
);

export type HideLinkMarkedDoneMutationVariables = Exact<{
  linkId: Scalars['uuid'];
}>;


export type HideLinkMarkedDoneMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type HideLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
}>;


export type HideLinkMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type JoinPrivatePollMutationVariables = Exact<{
  code: Scalars['String'];
  userId: Scalars['String'];
  pollId: Maybe<Scalars['String']>;
}>;


export type JoinPrivatePollMutation = (
  { __typename?: 'mutation_root' }
  & { result: (
    { __typename?: 'SuccessObjectDto' }
    & Pick<SuccessObjectDto, 'success' | 'message'>
  ) }
);

export type LeavePollMutationVariables = Exact<{
  userId: Scalars['uuid'];
  pollId: Scalars['uuid'];
}>;


export type LeavePollMutation = (
  { __typename?: 'mutation_root' }
  & { delete_users_polls: Maybe<(
    { __typename?: 'users_polls_mutation_response' }
    & Pick<Users_Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type MarkLinkDoneMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type MarkLinkDoneMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type MarkLinkUndoneMutationVariables = Exact<{
  linkId: Scalars['uuid'];
}>;


export type MarkLinkUndoneMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type RemoveLinkFromPollMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  pollId: Scalars['uuid'];
}>;


export type RemoveLinkFromPollMutation = (
  { __typename?: 'mutation_root' }
  & { delete_links_polls: Maybe<(
    { __typename?: 'links_polls_mutation_response' }
    & Pick<Links_Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type ReportLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  userId: Maybe<Scalars['uuid']>;
  reason: Maybe<Scalars['String']>;
}>;


export type ReportLinkMutation = (
  { __typename?: 'mutation_root' }
  & { insert_reported_links: Maybe<(
    { __typename?: 'reported_links_mutation_response' }
    & Pick<Reported_Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type AskResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AskResetPasswordMutation = (
  { __typename?: 'mutation_root' }
  & { result: (
    { __typename?: 'SuccessObjectDto' }
    & Pick<SuccessObjectDto, 'success' | 'message'>
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'mutation_root' }
  & { result: (
    { __typename?: 'SuccessObjectDto' }
    & Pick<SuccessObjectDto, 'success' | 'message'>
  ) }
);

export type UnblockUserMutationVariables = Exact<{
  userId: Scalars['uuid'];
  blockedBy: Scalars['uuid'];
}>;


export type UnblockUserMutation = (
  { __typename?: 'mutation_root' }
  & { delete_blocked_users: Maybe<(
    { __typename?: 'blocked_users_mutation_response' }
    & Pick<Blocked_Users_Mutation_Response, 'affected_rows'>
  )> }
);

export type UnfollowPollMutationVariables = Exact<{
  userId: Scalars['uuid'];
  pollId: Scalars['uuid'];
}>;


export type UnfollowPollMutation = (
  { __typename?: 'mutation_root' }
  & { delete_users_followed_polls: Maybe<(
    { __typename?: 'users_followed_polls_mutation_response' }
    & Pick<Users_Followed_Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateCommentReadAtMutationVariables = Exact<{
  userId: Scalars['uuid'];
  commentId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type UpdateCommentReadAtMutation = (
  { __typename?: 'mutation_root' }
  & { update_recipients: Maybe<(
    { __typename?: 'recipients_mutation_response' }
    & Pick<Recipients_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'recipients' }
      & Pick<Recipients, 'id' | 'read_at'>
    )> }
  )> }
);

export type UpdateDevicePushTokenMutationVariables = Exact<{
  userId: Scalars['uuid'];
  devicePushToken: Scalars['jsonb'];
}>;


export type UpdateDevicePushTokenMutation = (
  { __typename?: 'mutation_root' }
  & { update_users: Maybe<(
    { __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'users' }
      & Pick<Users, 'device_push_token'>
    )> }
  )> }
);

export type UpdateExpoPushTokenMutationVariables = Exact<{
  userId: Scalars['uuid'];
  expoPushToken: Scalars['String'];
}>;


export type UpdateExpoPushTokenMutation = (
  { __typename?: 'mutation_root' }
  & { update_users: Maybe<(
    { __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'users' }
      & Pick<Users, 'expo_push_token'>
    )> }
  )> }
);

export type UpdateLastSeenMutationVariables = Exact<{
  userId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type UpdateLastSeenMutation = (
  { __typename?: 'mutation_root' }
  & { update_users: Maybe<(
    { __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'users' }
      & Pick<Users, 'last_seen_at'>
    )> }
  )> }
);

export type UpdateLinkPostedByMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  userId: Scalars['uuid'];
}>;


export type UpdateLinkPostedByMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateLinkUrlMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  url: Maybe<Scalars['String']>;
}>;


export type UpdateLinkUrlMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  name: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
}>;


export type UpdateLinkMutation = (
  { __typename?: 'mutation_root' }
  & { update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateLocaleMutationVariables = Exact<{
  userId: Scalars['uuid'];
  locale: Scalars['String'];
}>;


export type UpdateLocaleMutation = (
  { __typename?: 'mutation_root' }
  & { update_users: Maybe<(
    { __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'users' }
      & Pick<Users, 'locale'>
    )> }
  )> }
);

export type UpdateMessageReadAtMutationVariables = Exact<{
  userId: Scalars['uuid'];
  messageId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type UpdateMessageReadAtMutation = (
  { __typename?: 'mutation_root' }
  & { update_messages_recipients: Maybe<(
    { __typename?: 'messages_recipients_mutation_response' }
    & Pick<Messages_Recipients_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'messages_recipients' }
      & Pick<Messages_Recipients, 'id' | 'read_at'>
    )> }
  )> }
);

export type UpdatePollIsListFirstMutationVariables = Exact<{
  pollId: Scalars['uuid'];
  isListFirst: Scalars['Boolean'];
}>;


export type UpdatePollIsListFirstMutation = (
  { __typename?: 'mutation_root' }
  & { update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdatePollSetPrivateMutationVariables = Exact<{
  pollId: Scalars['uuid'];
}>;


export type UpdatePollSetPrivateMutation = (
  { __typename?: 'mutation_root' }
  & { update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdatePollSetPublicMutationVariables = Exact<{
  pollId: Scalars['uuid'];
}>;


export type UpdatePollSetPublicMutation = (
  { __typename?: 'mutation_root' }
  & { update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdatePollMutationVariables = Exact<{
  pollId: Scalars['uuid'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdatePollMutation = (
  { __typename?: 'mutation_root' }
  & { update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateSubpollMutationVariables = Exact<{
  pollId: Scalars['uuid'];
  icon: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateSubpollMutation = (
  { __typename?: 'mutation_root' }
  & { update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateWebhookMutationVariables = Exact<{
  webhookId: Scalars['uuid'];
  url: Scalars['String'];
  active: Scalars['Boolean'];
}>;


export type UpdateWebhookMutation = (
  { __typename?: 'mutation_root' }
  & { update_webhooks: Maybe<(
    { __typename?: 'webhooks_mutation_response' }
    & Pick<Webhooks_Mutation_Response, 'affected_rows'>
  )> }
);

export type UploadAttachmentMutationVariables = Exact<{
  file: Scalars['Upload'];
  resourceId: Scalars['String'];
  resourceType: Scalars['String'];
}>;


export type UploadAttachmentMutation = (
  { __typename?: 'mutation_root' }
  & { attachment: (
    { __typename?: 'File' }
    & Pick<File, 'id' | 'reference' | 'url'>
  ) }
);

export type UploadPollPictureMutationVariables = Exact<{
  pollId: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadPollPictureMutation = (
  { __typename?: 'mutation_root' }
  & { result: (
    { __typename?: 'SuccessObjectDto' }
    & Pick<SuccessObjectDto, 'success' | 'message'>
  ) }
);

export type UploadUserProfilePictureMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadUserProfilePictureMutation = (
  { __typename?: 'mutation_root' }
  & { result: (
    { __typename?: 'SuccessObjectDto' }
    & Pick<SuccessObjectDto, 'success' | 'message'>
  ) }
);

export type UpvoteLinkMutationVariables = Exact<{
  linkId: Scalars['uuid'];
  pollId: Scalars['uuid'];
  userId: Scalars['uuid'];
  now: Scalars['timestamptz'];
}>;


export type UpvoteLinkMutation = (
  { __typename?: 'mutation_root' }
  & { insert_upvotes: Maybe<(
    { __typename?: 'upvotes_mutation_response' }
    & { returning: Array<(
      { __typename?: 'upvotes' }
      & Pick<Upvotes, 'id' | 'created_at'>
      & { user: (
        { __typename?: 'users' }
        & UserFragment
      ) }
    )> }
  )>, update_links: Maybe<(
    { __typename?: 'links_mutation_response' }
    & Pick<Links_Mutation_Response, 'affected_rows'>
  )>, update_polls: Maybe<(
    { __typename?: 'polls_mutation_response' }
    & Pick<Polls_Mutation_Response, 'affected_rows'>
  )> }
);

export type GetCommentsForLinkIdQueryVariables = Exact<{
  id: Scalars['uuid'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
}>;


export type GetCommentsForLinkIdQuery = (
  { __typename?: 'query_root' }
  & { link: Array<(
    { __typename?: 'links' }
    & Pick<Links, 'id' | 'name' | 'title'>
    & { comments: Array<(
      { __typename?: 'comments' }
      & CommentFragment
    )> }
  )> }
);

export type GetCurrentUserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetCurrentUserByIdQuery = (
  { __typename?: 'query_root' }
  & { user: Maybe<(
    { __typename?: 'users' }
    & CurrentUserFragment
  )> }
);

export type GetFollowedPollsForUserIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetFollowedPollsForUserIdQuery = (
  { __typename?: 'query_root' }
  & { polls: Array<(
    { __typename?: 'users_followed_polls' }
    & Pick<Users_Followed_Polls, 'id'>
    & { poll: (
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'picture' | 'description' | 'type'>
      & { subpolls: Array<(
        { __typename?: 'polls' }
        & Pick<Polls, 'id'>
      )>, users: Array<(
        { __typename?: 'users_polls' }
        & Pick<Users_Polls, 'id'>
        & { user: (
          { __typename?: 'users' }
          & UserFragment
        ) }
      )>, newLinks: Array<(
        { __typename?: 'links_polls' }
        & Pick<Links_Polls, 'id'>
        & { link: (
          { __typename?: 'links' }
          & Pick<Links, 'id'>
          & { comments: Array<(
            { __typename?: 'comments' }
            & Pick<Comments, 'id'>
            & { recipients: Array<(
              { __typename?: 'recipients' }
              & Pick<Recipients, 'id' | 'read_at'>
            )> }
          )> }
        ) }
      )>, messages: Array<(
        { __typename?: 'messages' }
        & Pick<Messages, 'id'>
        & { recipients: Array<(
          { __typename?: 'messages_recipients' }
          & Pick<Messages_Recipients, 'id' | 'read_at'>
        )> }
      )> }
    ) }
  )> }
);

export type GetLastLinkImagePollIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetLastLinkImagePollIdQuery = (
  { __typename?: 'query_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id'>
    & { newLinks: Array<(
      { __typename?: 'links_polls' }
      & Pick<Links_Polls, 'id'>
      & { link: (
        { __typename?: 'links' }
        & Pick<Links, 'id' | 'image'>
        & { attachments: Array<(
          { __typename?: 'links_attachments' }
          & LinkAttachmentsFragment
        )> }
      ) }
    )> }
  )> }
);

export type GetLinkByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetLinkByIdQuery = (
  { __typename?: 'query_root' }
  & { link: Maybe<(
    { __typename?: 'links' }
    & LinkFragment
  )> }
);

export type GetLinkImageByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetLinkImageByIdQuery = (
  { __typename?: 'query_root' }
  & { link: Maybe<(
    { __typename?: 'links' }
    & Pick<Links, 'id' | 'image'>
  )> }
);

export type GetMessagesAndLinksForPollIdQueryVariables = Exact<{
  id: Scalars['uuid'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
}>;


export type GetMessagesAndLinksForPollIdQuery = (
  { __typename?: 'query_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name'>
    & { messages_and_links: Maybe<Array<(
      { __typename?: 'messages_and_links' }
      & Pick<Messages_And_Links, 'type'>
      & { links: (
        { __typename?: 'links' }
        & LinkFragment
      ), messages: (
        { __typename?: 'messages' }
        & MessageFragment
      ) }
    )>> }
  )> }
);

export type GetMessagesForPollIdQueryVariables = Exact<{
  id: Scalars['uuid'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
}>;


export type GetMessagesForPollIdQuery = (
  { __typename?: 'query_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name'>
    & { messages: Array<(
      { __typename?: 'messages' }
      & MessageFragment
    )> }
  )> }
);

export type Nest_GetMewtwoByIdQueryVariables = Exact<{
  id: Scalars['String'];
  locale: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
}>;


export type Nest_GetMewtwoByIdQuery = (
  { __typename?: 'query_root' }
  & { result: Array<(
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'url' | 'title' | 'description'>
  )> }
);

export type GetPollByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetPollByIdQuery = (
  { __typename?: 'query_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name' | 'icon' | 'picture' | 'description' | 'type' | 'code'>
    & { isListFirst: Polls['is_list_first'], admin: Polls['created_by'] }
    & { subpolls: Array<(
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'icon'>
      & { webhooks: Array<(
        { __typename?: 'webhooks' }
        & Pick<Webhooks, 'id' | 'url' | 'active'>
      )> }
    )>, parent: Maybe<(
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'icon' | 'description' | 'type' | 'code' | 'picture'>
      & { subpolls: Array<(
        { __typename?: 'polls' }
        & Pick<Polls, 'id' | 'name' | 'icon'>
      )>, users: Array<(
        { __typename?: 'users_polls' }
        & Pick<Users_Polls, 'id'>
        & { user: (
          { __typename?: 'users' }
          & UserFragment
        ) }
      )> }
    )>, users: Array<(
      { __typename?: 'users_polls' }
      & Pick<Users_Polls, 'id'>
      & { user: (
        { __typename?: 'users' }
        & UserFragment
      ) }
    )>, newLinks: Array<(
      { __typename?: 'links_polls' }
      & Pick<Links_Polls, 'id'>
      & { link: (
        { __typename?: 'links' }
        & LinkFragment
      ) }
    )>, messages: Array<(
      { __typename?: 'messages' }
      & Pick<Messages, 'id'>
      & { recipients: Array<(
        { __typename?: 'messages_recipients' }
        & Pick<Messages_Recipients, 'id' | 'read_at'>
        & { user: (
          { __typename?: 'users' }
          & Pick<Users, 'id'>
        ) }
      )> }
    )>, webhooks: Array<(
      { __typename?: 'webhooks' }
      & Pick<Webhooks, 'id' | 'url' | 'active'>
    )> }
  )> }
);

export type GetPollMetadataByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetPollMetadataByIdQuery = (
  { __typename?: 'query_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name' | 'icon' | 'description' | 'type' | 'code'>
    & { parent: Maybe<(
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'icon' | 'description' | 'type' | 'code'>
    )> }
  )> }
);

export type GetPollNameByIdQueryVariables = Exact<{
  id: Scalars['String'];
  code: Scalars['String'];
}>;


export type GetPollNameByIdQuery = (
  { __typename?: 'query_root' }
  & { poll: (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'name' | 'type'>
  ) }
);

export type GetPollsForUserIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetPollsForUserIdQuery = (
  { __typename?: 'query_root' }
  & { user: Maybe<(
    { __typename?: 'users' }
    & Pick<Users, 'id'>
    & { polls: Array<(
      { __typename?: 'users_polls' }
      & Pick<Users_Polls, 'id'>
      & { poll: (
        { __typename?: 'polls' }
        & Pick<Polls, 'id' | 'name' | 'picture' | 'description' | 'type'>
        & { isListFirst: Polls['is_list_first'] }
        & { subpolls: Array<(
          { __typename?: 'polls' }
          & Pick<Polls, 'id'>
        )>, users: Array<(
          { __typename?: 'users_polls' }
          & Pick<Users_Polls, 'id'>
          & { user: (
            { __typename?: 'users' }
            & UserFragment
          ) }
        )>, newLinks: Array<(
          { __typename?: 'links_polls' }
          & Pick<Links_Polls, 'id'>
          & { link: (
            { __typename?: 'links' }
            & Pick<Links, 'id'>
            & { comments: Array<(
              { __typename?: 'comments' }
              & Pick<Comments, 'id'>
              & { recipients: Array<(
                { __typename?: 'recipients' }
                & Pick<Recipients, 'id' | 'read_at'>
              )> }
            )> }
          ) }
        )>, messages: Array<(
          { __typename?: 'messages' }
          & Pick<Messages, 'id'>
          & { recipients: Array<(
            { __typename?: 'messages_recipients' }
            & Pick<Messages_Recipients, 'id' | 'read_at'>
          )> }
        )> }
      ) }
    )> }
  )> }
);

export type GetPollsWithSubpollsForUserIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetPollsWithSubpollsForUserIdQuery = (
  { __typename?: 'query_root' }
  & { polls: Array<(
    { __typename?: 'users_polls' }
    & Pick<Users_Polls, 'id'>
    & { poll: (
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'icon' | 'picture' | 'description' | 'type'>
      & { subpolls: Array<(
        { __typename?: 'polls' }
        & Pick<Polls, 'id' | 'name' | 'icon'>
      )>, users: Array<(
        { __typename?: 'users_polls' }
        & Pick<Users_Polls, 'id'>
        & { user: (
          { __typename?: 'users' }
          & UserFragment
        ) }
      )> }
    ) }
  )> }
);

export type GetPublicPollsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicPollsQuery = (
  { __typename?: 'query_root' }
  & { polls: Array<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id'>
  )> }
);

export type GetPublicSubpollsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicSubpollsQuery = (
  { __typename?: 'query_root' }
  & { polls: Array<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id'>
  )> }
);

export type GetSubpollsForLinkIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetSubpollsForLinkIdQuery = (
  { __typename?: 'query_root' }
  & { link: Maybe<(
    { __typename?: 'links' }
    & Pick<Links, 'id'>
    & { subpolls: Array<(
      { __typename?: 'links_polls' }
      & Pick<Links_Polls, 'id'>
      & { poll: (
        { __typename?: 'polls' }
        & Pick<Polls, 'id' | 'icon' | 'name'>
      ) }
    )> }
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'query_root' }
  & { user: Maybe<(
    { __typename?: 'users' }
    & UserFragment
  )> }
);

export type GetUserIsFollowingPollForUserIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
  pollId: Scalars['uuid'];
}>;


export type GetUserIsFollowingPollForUserIdQuery = (
  { __typename?: 'query_root' }
  & { isFollowingPoll: Array<(
    { __typename?: 'users_followed_polls' }
    & Pick<Users_Followed_Polls, 'id'>
  )> }
);

export type GetCommentsForLinkIdSubSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
}>;


export type GetCommentsForLinkIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { link: Array<(
    { __typename?: 'links' }
    & Pick<Links, 'id' | 'name' | 'title'>
    & { comments: Array<(
      { __typename?: 'comments' }
      & CommentFragment
    )> }
  )> }
);

export type GetFollowedPollsForUserIdSubSubscriptionVariables = Exact<{
  userId: Scalars['uuid'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetFollowedPollsForUserIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { polls: Array<(
    { __typename?: 'users_followed_polls' }
    & Pick<Users_Followed_Polls, 'id'>
    & { poll: (
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'description'>
      & { users: Array<(
        { __typename?: 'users_polls' }
        & Pick<Users_Polls, 'id'>
        & { user: (
          { __typename?: 'users' }
          & UserFragment
        ) }
      )>, newLinks: Array<(
        { __typename?: 'links_polls' }
        & Pick<Links_Polls, 'id'>
        & { link: (
          { __typename?: 'links' }
          & Pick<Links, 'id'>
          & { comments: Array<(
            { __typename?: 'comments' }
            & Pick<Comments, 'id'>
            & { recipients: Array<(
              { __typename?: 'recipients' }
              & Pick<Recipients, 'id' | 'read_at'>
            )> }
          )> }
        ) }
      )>, messages: Array<(
        { __typename?: 'messages' }
        & Pick<Messages, 'id'>
        & { recipients: Array<(
          { __typename?: 'messages_recipients' }
          & Pick<Messages_Recipients, 'id' | 'read_at'>
        )> }
      )> }
    ) }
  )> }
);

export type GetLinkByIdSubSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetLinkByIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { link: Maybe<(
    { __typename?: 'links' }
    & LinkFragment
  )> }
);

export type GetLinkImageByIdSubSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetLinkImageByIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { link: Maybe<(
    { __typename?: 'links' }
    & Pick<Links, 'id' | 'image'>
  )> }
);

export type GetMessagesAndLinksForPollIdSubSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
}>;


export type GetMessagesAndLinksForPollIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name'>
    & { messages_and_links: Maybe<Array<(
      { __typename?: 'messages_and_links' }
      & Pick<Messages_And_Links, 'type'>
      & { links: (
        { __typename?: 'links' }
        & LinkFragment
      ), messages: (
        { __typename?: 'messages' }
        & MessageFragment
      ) }
    )>> }
  )> }
);

export type GetMessagesForPollIdSubSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
  offset: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
}>;


export type GetMessagesForPollIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name'>
    & { messages: Array<(
      { __typename?: 'messages' }
      & MessageFragment
    )> }
  )> }
);

export type GetPollByIdSubSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetPollByIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { poll: Maybe<(
    { __typename?: 'polls' }
    & Pick<Polls, 'id' | 'name' | 'icon' | 'description' | 'code'>
    & { isListFirst: Polls['is_list_first'] }
    & { subpolls: Array<(
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'icon'>
    )>, users: Array<(
      { __typename?: 'users_polls' }
      & Pick<Users_Polls, 'id'>
      & { user: (
        { __typename?: 'users' }
        & UserFragment
      ) }
    )>, newLinks: Array<(
      { __typename?: 'links_polls' }
      & Pick<Links_Polls, 'id'>
      & { link: (
        { __typename?: 'links' }
        & LinkFragment
      ) }
    )>, messages: Array<(
      { __typename?: 'messages' }
      & Pick<Messages, 'id'>
      & { recipients: Array<(
        { __typename?: 'messages_recipients' }
        & Pick<Messages_Recipients, 'id' | 'read_at'>
        & { user: (
          { __typename?: 'users' }
          & Pick<Users, 'id'>
        ) }
      )> }
    )> }
  )> }
);

export type GetPollsForUserIdSubSubscriptionVariables = Exact<{
  userId: Scalars['uuid'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetPollsForUserIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { user: Maybe<(
    { __typename?: 'users' }
    & Pick<Users, 'id'>
    & { polls: Array<(
      { __typename?: 'users_polls' }
      & Pick<Users_Polls, 'id'>
      & { poll: (
        { __typename?: 'polls' }
        & Pick<Polls, 'id' | 'name' | 'description'>
        & { isListFirst: Polls['is_list_first'] }
        & { users: Array<(
          { __typename?: 'users_polls' }
          & Pick<Users_Polls, 'id'>
          & { user: (
            { __typename?: 'users' }
            & UserFragment
          ) }
        )>, newLinks: Array<(
          { __typename?: 'links_polls' }
          & Pick<Links_Polls, 'id'>
          & { link: (
            { __typename?: 'links' }
            & Pick<Links, 'id'>
            & { comments: Array<(
              { __typename?: 'comments' }
              & Pick<Comments, 'id'>
              & { recipients: Array<(
                { __typename?: 'recipients' }
                & Pick<Recipients, 'id' | 'read_at'>
              )> }
            )> }
          ) }
        )>, messages: Array<(
          { __typename?: 'messages' }
          & Pick<Messages, 'id'>
          & { recipients: Array<(
            { __typename?: 'messages_recipients' }
            & Pick<Messages_Recipients, 'id' | 'read_at'>
          )> }
        )> }
      ) }
    )> }
  )> }
);

export type GetPollsWithSubpollsForUserIdSubSubscriptionVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetPollsWithSubpollsForUserIdSubSubscription = (
  { __typename?: 'subscription_root' }
  & { polls: Array<(
    { __typename?: 'users_polls' }
    & Pick<Users_Polls, 'id'>
    & { poll: (
      { __typename?: 'polls' }
      & Pick<Polls, 'id' | 'name' | 'icon' | 'description'>
      & { subpolls: Array<(
        { __typename?: 'polls' }
        & Pick<Polls, 'id' | 'name' | 'icon'>
      )>, users: Array<(
        { __typename?: 'users_polls' }
        & Pick<Users_Polls, 'id'>
        & { user: (
          { __typename?: 'users' }
          & UserFragment
        ) }
      )> }
    ) }
  )> }
);

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  date: any;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq: Maybe<Scalars['Boolean']>;
  _gt: Maybe<Scalars['Boolean']>;
  _gte: Maybe<Scalars['Boolean']>;
  _in: Maybe<Array<Scalars['Boolean']>>;
  _is_null: Maybe<Scalars['Boolean']>;
  _lt: Maybe<Scalars['Boolean']>;
  _lte: Maybe<Scalars['Boolean']>;
  _neq: Maybe<Scalars['Boolean']>;
  _nin: Maybe<Array<Scalars['Boolean']>>;
};


export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reference: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  postedBy: Scalars['ID'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  nest_askResetUserPassword: SuccessObjectDto;
  nest_deleteFile: SuccessObjectDto;
  nest_joinPrivatePoll: SuccessObjectDto;
  nest_loginUser: SessionObject;
  nest_resetUserPassword: SuccessObjectDto;
  nest_uploadFile: File;
  nest_uploadPollPicture: SuccessObjectDto;
  nest_userUploadProfilePicture: SuccessObjectDto;
};


export type MutationNest_AskResetUserPasswordArgs = {
  email: Scalars['String'];
};


export type MutationNest_DeleteFileArgs = {
  fileId: Scalars['String'];
};


export type MutationNest_JoinPrivatePollArgs = {
  code: Scalars['String'];
  pollId: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationNest_LoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNest_ResetUserPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationNest_UploadFileArgs = {
  file: Scalars['Upload'];
  resourceId: Scalars['String'];
  resourceType: Scalars['String'];
};


export type MutationNest_UploadPollPictureArgs = {
  file: Scalars['Upload'];
  pollId: Scalars['String'];
};


export type MutationNest_UserUploadProfilePictureArgs = {
  file: Scalars['Upload'];
};

export type Poll = {
  __typename?: 'Poll';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  picture: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getMewtwoForPollNameByUserId: Array<Link>;
  getMewtwoForSubpollNameByUserId: Array<Link>;
  nest_getMewtwoById: Array<Link>;
  nest_getPollName: Poll;
};


export type QueryGetMewtwoForPollNameByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryGetMewtwoForSubpollNameByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryNest_GetMewtwoByIdArgs = {
  id: Scalars['String'];
  locale: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
};


export type QueryNest_GetPollNameArgs = {
  code: Scalars['String'];
  id: Scalars['String'];
};

export type SessionObject = {
  __typename?: 'SessionObject';
  token: Scalars['String'];
  type: Scalars['String'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq: Maybe<Scalars['String']>;
  _gt: Maybe<Scalars['String']>;
  _gte: Maybe<Scalars['String']>;
  _ilike: Maybe<Scalars['String']>;
  _in: Maybe<Array<Scalars['String']>>;
  _is_null: Maybe<Scalars['Boolean']>;
  _like: Maybe<Scalars['String']>;
  _lt: Maybe<Scalars['String']>;
  _lte: Maybe<Scalars['String']>;
  _neq: Maybe<Scalars['String']>;
  _nilike: Maybe<Scalars['String']>;
  _nin: Maybe<Array<Scalars['String']>>;
  _nlike: Maybe<Scalars['String']>;
  _nsimilar: Maybe<Scalars['String']>;
  _similar: Maybe<Scalars['String']>;
};

export type SuccessObjectDto = {
  __typename?: 'SuccessObjectDto';
  message: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};


/** columns and relationships of "blocked_users" */
export type Blocked_Users = {
  __typename?: 'blocked_users';
  blocked_by: Maybe<Scalars['uuid']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['uuid'];
};

/** aggregated selection of "blocked_users" */
export type Blocked_Users_Aggregate = {
  __typename?: 'blocked_users_aggregate';
  aggregate: Maybe<Blocked_Users_Aggregate_Fields>;
  nodes: Array<Blocked_Users>;
};

/** aggregate fields of "blocked_users" */
export type Blocked_Users_Aggregate_Fields = {
  __typename?: 'blocked_users_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Blocked_Users_Max_Fields>;
  min: Maybe<Blocked_Users_Min_Fields>;
};


/** aggregate fields of "blocked_users" */
export type Blocked_Users_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Blocked_Users_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "blocked_users" */
export type Blocked_Users_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Blocked_Users_Max_Order_By>;
  min: Maybe<Blocked_Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "blocked_users" */
export type Blocked_Users_Arr_Rel_Insert_Input = {
  data: Array<Blocked_Users_Insert_Input>;
};

/** Boolean expression to filter rows from the table "blocked_users". All fields are combined with a logical 'AND'. */
export type Blocked_Users_Bool_Exp = {
  _and: Maybe<Array<Maybe<Blocked_Users_Bool_Exp>>>;
  _not: Maybe<Blocked_Users_Bool_Exp>;
  _or: Maybe<Array<Maybe<Blocked_Users_Bool_Exp>>>;
  blocked_by: Maybe<Uuid_Comparison_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user_id: Maybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "blocked_users" */
export type Blocked_Users_Insert_Input = {
  blocked_by: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Blocked_Users_Max_Fields = {
  __typename?: 'blocked_users_max_fields';
  blocked_by: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "blocked_users" */
export type Blocked_Users_Max_Order_By = {
  blocked_by: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Blocked_Users_Min_Fields = {
  __typename?: 'blocked_users_min_fields';
  blocked_by: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "blocked_users" */
export type Blocked_Users_Min_Order_By = {
  blocked_by: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "blocked_users" */
export type Blocked_Users_Mutation_Response = {
  __typename?: 'blocked_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Blocked_Users>;
};

/** input type for inserting object relation for remote table "blocked_users" */
export type Blocked_Users_Obj_Rel_Insert_Input = {
  data: Blocked_Users_Insert_Input;
};

/** ordering options when selecting data from "blocked_users" */
export type Blocked_Users_Order_By = {
  blocked_by: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "blocked_users" */
export type Blocked_Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "blocked_users" */
export type Blocked_Users_Select_Column = 
  /** column name */
  | 'blocked_by'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** columns and relationships of "comments" */
export type Comments = {
  __typename?: 'comments';
  /** An array relationship */
  comments_attachments: Array<Comments_Attachments>;
  /** An aggregated array relationship */
  comments_attachments_aggregate: Comments_Attachments_Aggregate;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  posted_by: Scalars['uuid'];
  /** An array relationship */
  recipients: Array<Recipients>;
  /** An aggregated array relationship */
  recipients_aggregate: Recipients_Aggregate;
  text: Scalars['String'];
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
};


/** columns and relationships of "comments" */
export type CommentsComments_AttachmentsArgs = {
  distinct_on: Maybe<Array<Comments_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Attachments_Order_By>>;
  where: Maybe<Comments_Attachments_Bool_Exp>;
};


/** columns and relationships of "comments" */
export type CommentsComments_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Attachments_Order_By>>;
  where: Maybe<Comments_Attachments_Bool_Exp>;
};


/** columns and relationships of "comments" */
export type CommentsRecipientsArgs = {
  distinct_on: Maybe<Array<Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Recipients_Order_By>>;
  where: Maybe<Recipients_Bool_Exp>;
};


/** columns and relationships of "comments" */
export type CommentsRecipients_AggregateArgs = {
  distinct_on: Maybe<Array<Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Recipients_Order_By>>;
  where: Maybe<Recipients_Bool_Exp>;
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate: Maybe<Comments_Aggregate_Fields>;
  nodes: Array<Comments>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Comments_Max_Fields>;
  min: Maybe<Comments_Min_Fields>;
};


/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Comments_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "comments" */
export type Comments_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Comments_Max_Order_By>;
  min: Maybe<Comments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "comments" */
export type Comments_Arr_Rel_Insert_Input = {
  data: Array<Comments_Insert_Input>;
};

/** columns and relationships of "comments_attachments" */
export type Comments_Attachments = {
  __typename?: 'comments_attachments';
  /** An object relationship */
  comment: Comments;
  comment_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  posted_by: Scalars['uuid'];
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  url: Maybe<Scalars['String']>;
};

/** aggregated selection of "comments_attachments" */
export type Comments_Attachments_Aggregate = {
  __typename?: 'comments_attachments_aggregate';
  aggregate: Maybe<Comments_Attachments_Aggregate_Fields>;
  nodes: Array<Comments_Attachments>;
};

/** aggregate fields of "comments_attachments" */
export type Comments_Attachments_Aggregate_Fields = {
  __typename?: 'comments_attachments_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Comments_Attachments_Max_Fields>;
  min: Maybe<Comments_Attachments_Min_Fields>;
};


/** aggregate fields of "comments_attachments" */
export type Comments_Attachments_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Comments_Attachments_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "comments_attachments" */
export type Comments_Attachments_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Comments_Attachments_Max_Order_By>;
  min: Maybe<Comments_Attachments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "comments_attachments" */
export type Comments_Attachments_Arr_Rel_Insert_Input = {
  data: Array<Comments_Attachments_Insert_Input>;
};

/** Boolean expression to filter rows from the table "comments_attachments". All fields are combined with a logical 'AND'. */
export type Comments_Attachments_Bool_Exp = {
  _and: Maybe<Array<Maybe<Comments_Attachments_Bool_Exp>>>;
  _not: Maybe<Comments_Attachments_Bool_Exp>;
  _or: Maybe<Array<Maybe<Comments_Attachments_Bool_Exp>>>;
  comment: Maybe<Comments_Bool_Exp>;
  comment_id: Maybe<Uuid_Comparison_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  file_id: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  posted_by: Maybe<Uuid_Comparison_Exp>;
  type: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  url: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "comments_attachments" */
export type Comments_Attachments_Insert_Input = {
  comment: Maybe<Comments_Obj_Rel_Insert_Input>;
  comment_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Comments_Attachments_Max_Fields = {
  __typename?: 'comments_attachments_max_fields';
  comment_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "comments_attachments" */
export type Comments_Attachments_Max_Order_By = {
  comment_id: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Attachments_Min_Fields = {
  __typename?: 'comments_attachments_min_fields';
  comment_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "comments_attachments" */
export type Comments_Attachments_Min_Order_By = {
  comment_id: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** response of any mutation on the table "comments_attachments" */
export type Comments_Attachments_Mutation_Response = {
  __typename?: 'comments_attachments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Comments_Attachments>;
};

/** input type for inserting object relation for remote table "comments_attachments" */
export type Comments_Attachments_Obj_Rel_Insert_Input = {
  data: Comments_Attachments_Insert_Input;
};

/** ordering options when selecting data from "comments_attachments" */
export type Comments_Attachments_Order_By = {
  comment: Maybe<Comments_Order_By>;
  comment_id: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** primary key columns input for table: "comments_attachments" */
export type Comments_Attachments_Pk_Columns_Input = {
  comment_id: Scalars['uuid'];
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
};

/** select columns of table "comments_attachments" */
export type Comments_Attachments_Select_Column = 
  /** column name */
  | 'comment_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'file_id'
  /** column name */
  | 'id'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'url';

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  _and: Maybe<Array<Maybe<Comments_Bool_Exp>>>;
  _not: Maybe<Comments_Bool_Exp>;
  _or: Maybe<Array<Maybe<Comments_Bool_Exp>>>;
  comments_attachments: Maybe<Comments_Attachments_Bool_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  posted_by: Maybe<Uuid_Comparison_Exp>;
  recipients: Maybe<Recipients_Bool_Exp>;
  text: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  comments_attachments: Maybe<Comments_Attachments_Arr_Rel_Insert_Input>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  recipients: Maybe<Recipients_Arr_Rel_Insert_Input>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  __typename?: 'comments_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "comments" */
export type Comments_Max_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  text: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  __typename?: 'comments_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "comments" */
export type Comments_Min_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  text: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  __typename?: 'comments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Comments>;
};

/** input type for inserting object relation for remote table "comments" */
export type Comments_Obj_Rel_Insert_Input = {
  data: Comments_Insert_Input;
};

/** ordering options when selecting data from "comments" */
export type Comments_Order_By = {
  comments_attachments_aggregate: Maybe<Comments_Attachments_Aggregate_Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  recipients_aggregate: Maybe<Recipients_Aggregate_Order_By>;
  text: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "comments" */
export type Comments_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "comments" */
export type Comments_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'text'
  /** column name */
  | 'updated_at';


/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq: Maybe<Scalars['date']>;
  _gt: Maybe<Scalars['date']>;
  _gte: Maybe<Scalars['date']>;
  _in: Maybe<Array<Scalars['date']>>;
  _is_null: Maybe<Scalars['Boolean']>;
  _lt: Maybe<Scalars['date']>;
  _lte: Maybe<Scalars['date']>;
  _neq: Maybe<Scalars['date']>;
  _nin: Maybe<Array<Scalars['date']>>;
};

/** columns and relationships of "downvotes" */
export type Downvotes = {
  __typename?: 'downvotes';
  created_at: Scalars['timestamptz'];
  created_by: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "downvotes" */
export type Downvotes_Aggregate = {
  __typename?: 'downvotes_aggregate';
  aggregate: Maybe<Downvotes_Aggregate_Fields>;
  nodes: Array<Downvotes>;
};

/** aggregate fields of "downvotes" */
export type Downvotes_Aggregate_Fields = {
  __typename?: 'downvotes_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Downvotes_Max_Fields>;
  min: Maybe<Downvotes_Min_Fields>;
};


/** aggregate fields of "downvotes" */
export type Downvotes_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Downvotes_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "downvotes" */
export type Downvotes_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Downvotes_Max_Order_By>;
  min: Maybe<Downvotes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "downvotes" */
export type Downvotes_Arr_Rel_Insert_Input = {
  data: Array<Downvotes_Insert_Input>;
};

/** Boolean expression to filter rows from the table "downvotes". All fields are combined with a logical 'AND'. */
export type Downvotes_Bool_Exp = {
  _and: Maybe<Array<Maybe<Downvotes_Bool_Exp>>>;
  _not: Maybe<Downvotes_Bool_Exp>;
  _or: Maybe<Array<Maybe<Downvotes_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  created_by: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** input type for inserting data into table "downvotes" */
export type Downvotes_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Downvotes_Max_Fields = {
  __typename?: 'downvotes_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "downvotes" */
export type Downvotes_Max_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Downvotes_Min_Fields = {
  __typename?: 'downvotes_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "downvotes" */
export type Downvotes_Min_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
};

/** response of any mutation on the table "downvotes" */
export type Downvotes_Mutation_Response = {
  __typename?: 'downvotes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Downvotes>;
};

/** input type for inserting object relation for remote table "downvotes" */
export type Downvotes_Obj_Rel_Insert_Input = {
  data: Downvotes_Insert_Input;
};

/** ordering options when selecting data from "downvotes" */
export type Downvotes_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "downvotes" */
export type Downvotes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "downvotes" */
export type Downvotes_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id';

export type Get_Messages_And_Links_Args = {
  pollid: Maybe<Scalars['uuid']>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains: Maybe<Scalars['jsonb']>;
  _eq: Maybe<Scalars['jsonb']>;
  _gt: Maybe<Scalars['jsonb']>;
  _gte: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any: Maybe<Array<Scalars['String']>>;
  _in: Maybe<Array<Scalars['jsonb']>>;
  _is_null: Maybe<Scalars['Boolean']>;
  _lt: Maybe<Scalars['jsonb']>;
  _lte: Maybe<Scalars['jsonb']>;
  _neq: Maybe<Scalars['jsonb']>;
  _nin: Maybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "links" */
export type Links = {
  __typename?: 'links';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregated array relationship */
  comments_aggregate: Comments_Aggregate;
  created_at: Maybe<Scalars['timestamptz']>;
  deleted_at: Maybe<Scalars['timestamptz']>;
  description: Maybe<Scalars['String']>;
  /** An array relationship */
  downvotes: Array<Downvotes>;
  /** An aggregated array relationship */
  downvotes_aggregate: Downvotes_Aggregate;
  happened_at: Maybe<Scalars['timestamptz']>;
  hidden: Scalars['Boolean'];
  id: Scalars['uuid'];
  image: Maybe<Scalars['String']>;
  /** An array relationship */
  links_attachments: Array<Links_Attachments>;
  /** An aggregated array relationship */
  links_attachments_aggregate: Links_Attachments_Aggregate;
  /** An array relationship */
  links_recipients: Array<Links_Recipients>;
  /** An aggregated array relationship */
  links_recipients_aggregate: Links_Recipients_Aggregate;
  name: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  /** An array relationship */
  polls: Array<Links_Polls>;
  /** An aggregated array relationship */
  polls_aggregate: Links_Polls_Aggregate;
  posted_by: Scalars['uuid'];
  title: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  upvotes: Array<Upvotes>;
  /** An aggregated array relationship */
  upvotes_aggregate: Upvotes_Aggregate;
  url: Maybe<Scalars['String']>;
  /** An object relationship */
  user: Users;
};


/** columns and relationships of "links" */
export type LinksCommentsArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksComments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksDownvotesArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksDownvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_AttachmentsArgs = {
  distinct_on: Maybe<Array<Links_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Attachments_Order_By>>;
  where: Maybe<Links_Attachments_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Attachments_Order_By>>;
  where: Maybe<Links_Attachments_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_RecipientsArgs = {
  distinct_on: Maybe<Array<Links_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Recipients_Order_By>>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_Recipients_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Recipients_Order_By>>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksPollsArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksPolls_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksUpvotesArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksUpvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};

/** aggregated selection of "links" */
export type Links_Aggregate = {
  __typename?: 'links_aggregate';
  aggregate: Maybe<Links_Aggregate_Fields>;
  nodes: Array<Links>;
};

/** aggregate fields of "links" */
export type Links_Aggregate_Fields = {
  __typename?: 'links_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Links_Max_Fields>;
  min: Maybe<Links_Min_Fields>;
};


/** aggregate fields of "links" */
export type Links_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Links_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "links" */
export type Links_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Links_Max_Order_By>;
  min: Maybe<Links_Min_Order_By>;
};

/** input type for inserting array relation for remote table "links" */
export type Links_Arr_Rel_Insert_Input = {
  data: Array<Links_Insert_Input>;
  on_conflict: Maybe<Links_On_Conflict>;
};

/** columns and relationships of "links_attachments" */
export type Links_Attachments = {
  __typename?: 'links_attachments';
  created_at: Scalars['timestamptz'];
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  posted_by: Scalars['uuid'];
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  url: Maybe<Scalars['String']>;
};

/** aggregated selection of "links_attachments" */
export type Links_Attachments_Aggregate = {
  __typename?: 'links_attachments_aggregate';
  aggregate: Maybe<Links_Attachments_Aggregate_Fields>;
  nodes: Array<Links_Attachments>;
};

/** aggregate fields of "links_attachments" */
export type Links_Attachments_Aggregate_Fields = {
  __typename?: 'links_attachments_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Links_Attachments_Max_Fields>;
  min: Maybe<Links_Attachments_Min_Fields>;
};


/** aggregate fields of "links_attachments" */
export type Links_Attachments_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Links_Attachments_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "links_attachments" */
export type Links_Attachments_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Links_Attachments_Max_Order_By>;
  min: Maybe<Links_Attachments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "links_attachments" */
export type Links_Attachments_Arr_Rel_Insert_Input = {
  data: Array<Links_Attachments_Insert_Input>;
};

/** Boolean expression to filter rows from the table "links_attachments". All fields are combined with a logical 'AND'. */
export type Links_Attachments_Bool_Exp = {
  _and: Maybe<Array<Maybe<Links_Attachments_Bool_Exp>>>;
  _not: Maybe<Links_Attachments_Bool_Exp>;
  _or: Maybe<Array<Maybe<Links_Attachments_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  file_id: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  posted_by: Maybe<Uuid_Comparison_Exp>;
  type: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  url: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "links_attachments" */
export type Links_Attachments_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Links_Attachments_Max_Fields = {
  __typename?: 'links_attachments_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "links_attachments" */
export type Links_Attachments_Max_Order_By = {
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Attachments_Min_Fields = {
  __typename?: 'links_attachments_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "links_attachments" */
export type Links_Attachments_Min_Order_By = {
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** response of any mutation on the table "links_attachments" */
export type Links_Attachments_Mutation_Response = {
  __typename?: 'links_attachments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Links_Attachments>;
};

/** input type for inserting object relation for remote table "links_attachments" */
export type Links_Attachments_Obj_Rel_Insert_Input = {
  data: Links_Attachments_Insert_Input;
};

/** ordering options when selecting data from "links_attachments" */
export type Links_Attachments_Order_By = {
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** primary key columns input for table: "links_attachments" */
export type Links_Attachments_Pk_Columns_Input = {
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  link_id: Scalars['uuid'];
};

/** select columns of table "links_attachments" */
export type Links_Attachments_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'file_id'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'url';

/** Boolean expression to filter rows from the table "links". All fields are combined with a logical 'AND'. */
export type Links_Bool_Exp = {
  _and: Maybe<Array<Maybe<Links_Bool_Exp>>>;
  _not: Maybe<Links_Bool_Exp>;
  _or: Maybe<Array<Maybe<Links_Bool_Exp>>>;
  comments: Maybe<Comments_Bool_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  deleted_at: Maybe<Timestamptz_Comparison_Exp>;
  description: Maybe<String_Comparison_Exp>;
  downvotes: Maybe<Downvotes_Bool_Exp>;
  happened_at: Maybe<Timestamptz_Comparison_Exp>;
  hidden: Maybe<Boolean_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  image: Maybe<String_Comparison_Exp>;
  links_attachments: Maybe<Links_Attachments_Bool_Exp>;
  links_recipients: Maybe<Links_Recipients_Bool_Exp>;
  name: Maybe<String_Comparison_Exp>;
  note: Maybe<String_Comparison_Exp>;
  polls: Maybe<Links_Polls_Bool_Exp>;
  posted_by: Maybe<Uuid_Comparison_Exp>;
  title: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  upvotes: Maybe<Upvotes_Bool_Exp>;
  url: Maybe<String_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "links" */
export type Links_Constraint = 
  /** unique or primary key constraint */
  | 'links_id_key'
  /** unique or primary key constraint */
  | 'links_pkey';

/** input type for inserting data into table "links" */
export type Links_Insert_Input = {
  comments: Maybe<Comments_Arr_Rel_Insert_Input>;
  created_at: Maybe<Scalars['timestamptz']>;
  downvotes: Maybe<Downvotes_Arr_Rel_Insert_Input>;
  id: Maybe<Scalars['uuid']>;
  links_attachments: Maybe<Links_Attachments_Arr_Rel_Insert_Input>;
  links_recipients: Maybe<Links_Recipients_Arr_Rel_Insert_Input>;
  name: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  polls: Maybe<Links_Polls_Arr_Rel_Insert_Input>;
  posted_by: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  upvotes: Maybe<Upvotes_Arr_Rel_Insert_Input>;
  url: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Links_Max_Fields = {
  __typename?: 'links_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  deleted_at: Maybe<Scalars['timestamptz']>;
  description: Maybe<Scalars['String']>;
  happened_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  posted_by: Maybe<Scalars['uuid']>;
  title: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "links" */
export type Links_Max_Order_By = {
  created_at: Maybe<Order_By>;
  deleted_at: Maybe<Order_By>;
  description: Maybe<Order_By>;
  happened_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  image: Maybe<Order_By>;
  name: Maybe<Order_By>;
  note: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  title: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Min_Fields = {
  __typename?: 'links_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  deleted_at: Maybe<Scalars['timestamptz']>;
  description: Maybe<Scalars['String']>;
  happened_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  posted_by: Maybe<Scalars['uuid']>;
  title: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "links" */
export type Links_Min_Order_By = {
  created_at: Maybe<Order_By>;
  deleted_at: Maybe<Order_By>;
  description: Maybe<Order_By>;
  happened_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  image: Maybe<Order_By>;
  name: Maybe<Order_By>;
  note: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  title: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** response of any mutation on the table "links" */
export type Links_Mutation_Response = {
  __typename?: 'links_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Links>;
};

/** input type for inserting object relation for remote table "links" */
export type Links_Obj_Rel_Insert_Input = {
  data: Links_Insert_Input;
  on_conflict: Maybe<Links_On_Conflict>;
};

/** on conflict condition type for table "links" */
export type Links_On_Conflict = {
  constraint: Links_Constraint;
  update_columns: Array<Links_Update_Column>;
  where: Maybe<Links_Bool_Exp>;
};

/** ordering options when selecting data from "links" */
export type Links_Order_By = {
  comments_aggregate: Maybe<Comments_Aggregate_Order_By>;
  created_at: Maybe<Order_By>;
  deleted_at: Maybe<Order_By>;
  description: Maybe<Order_By>;
  downvotes_aggregate: Maybe<Downvotes_Aggregate_Order_By>;
  happened_at: Maybe<Order_By>;
  hidden: Maybe<Order_By>;
  id: Maybe<Order_By>;
  image: Maybe<Order_By>;
  links_attachments_aggregate: Maybe<Links_Attachments_Aggregate_Order_By>;
  links_recipients_aggregate: Maybe<Links_Recipients_Aggregate_Order_By>;
  name: Maybe<Order_By>;
  note: Maybe<Order_By>;
  polls_aggregate: Maybe<Links_Polls_Aggregate_Order_By>;
  posted_by: Maybe<Order_By>;
  title: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  upvotes_aggregate: Maybe<Upvotes_Aggregate_Order_By>;
  url: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "links" */
export type Links_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "links_polls" */
export type Links_Polls = {
  __typename?: 'links_polls';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "links_polls" */
export type Links_Polls_Aggregate = {
  __typename?: 'links_polls_aggregate';
  aggregate: Maybe<Links_Polls_Aggregate_Fields>;
  nodes: Array<Links_Polls>;
};

/** aggregate fields of "links_polls" */
export type Links_Polls_Aggregate_Fields = {
  __typename?: 'links_polls_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Links_Polls_Max_Fields>;
  min: Maybe<Links_Polls_Min_Fields>;
};


/** aggregate fields of "links_polls" */
export type Links_Polls_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Links_Polls_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "links_polls" */
export type Links_Polls_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Links_Polls_Max_Order_By>;
  min: Maybe<Links_Polls_Min_Order_By>;
};

/** input type for inserting array relation for remote table "links_polls" */
export type Links_Polls_Arr_Rel_Insert_Input = {
  data: Array<Links_Polls_Insert_Input>;
};

/** Boolean expression to filter rows from the table "links_polls". All fields are combined with a logical 'AND'. */
export type Links_Polls_Bool_Exp = {
  _and: Maybe<Array<Maybe<Links_Polls_Bool_Exp>>>;
  _not: Maybe<Links_Polls_Bool_Exp>;
  _or: Maybe<Array<Maybe<Links_Polls_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
};

/** input type for inserting data into table "links_polls" */
export type Links_Polls_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
  poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Links_Polls_Max_Fields = {
  __typename?: 'links_polls_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "links_polls" */
export type Links_Polls_Max_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Polls_Min_Fields = {
  __typename?: 'links_polls_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "links_polls" */
export type Links_Polls_Min_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** response of any mutation on the table "links_polls" */
export type Links_Polls_Mutation_Response = {
  __typename?: 'links_polls_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Links_Polls>;
};

/** input type for inserting object relation for remote table "links_polls" */
export type Links_Polls_Obj_Rel_Insert_Input = {
  data: Links_Polls_Insert_Input;
};

/** ordering options when selecting data from "links_polls" */
export type Links_Polls_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** primary key columns input for table: "links_polls" */
export type Links_Polls_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "links_polls" */
export type Links_Polls_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'updated_at';

/** columns and relationships of "links_recipients" */
export type Links_Recipients = {
  __typename?: 'links_recipients';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "links_recipients" */
export type Links_Recipients_Aggregate = {
  __typename?: 'links_recipients_aggregate';
  aggregate: Maybe<Links_Recipients_Aggregate_Fields>;
  nodes: Array<Links_Recipients>;
};

/** aggregate fields of "links_recipients" */
export type Links_Recipients_Aggregate_Fields = {
  __typename?: 'links_recipients_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Links_Recipients_Max_Fields>;
  min: Maybe<Links_Recipients_Min_Fields>;
};


/** aggregate fields of "links_recipients" */
export type Links_Recipients_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Links_Recipients_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "links_recipients" */
export type Links_Recipients_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Links_Recipients_Max_Order_By>;
  min: Maybe<Links_Recipients_Min_Order_By>;
};

/** input type for inserting array relation for remote table "links_recipients" */
export type Links_Recipients_Arr_Rel_Insert_Input = {
  data: Array<Links_Recipients_Insert_Input>;
  on_conflict: Maybe<Links_Recipients_On_Conflict>;
};

/** Boolean expression to filter rows from the table "links_recipients". All fields are combined with a logical 'AND'. */
export type Links_Recipients_Bool_Exp = {
  _and: Maybe<Array<Maybe<Links_Recipients_Bool_Exp>>>;
  _not: Maybe<Links_Recipients_Bool_Exp>;
  _or: Maybe<Array<Maybe<Links_Recipients_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  read_at: Maybe<Timestamptz_Comparison_Exp>;
  received_at: Maybe<Timestamptz_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  user_id: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "links_recipients" */
export type Links_Recipients_Constraint = 
  /** unique or primary key constraint */
  | 'links_recipients_id_key'
  /** unique or primary key constraint */
  | 'links_recipients_pkey';

/** input type for inserting data into table "links_recipients" */
export type Links_Recipients_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Links_Recipients_Max_Fields = {
  __typename?: 'links_recipients_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "links_recipients" */
export type Links_Recipients_Max_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Recipients_Min_Fields = {
  __typename?: 'links_recipients_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "links_recipients" */
export type Links_Recipients_Min_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "links_recipients" */
export type Links_Recipients_Mutation_Response = {
  __typename?: 'links_recipients_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Links_Recipients>;
};

/** input type for inserting object relation for remote table "links_recipients" */
export type Links_Recipients_Obj_Rel_Insert_Input = {
  data: Links_Recipients_Insert_Input;
  on_conflict: Maybe<Links_Recipients_On_Conflict>;
};

/** on conflict condition type for table "links_recipients" */
export type Links_Recipients_On_Conflict = {
  constraint: Links_Recipients_Constraint;
  update_columns: Array<Links_Recipients_Update_Column>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};

/** ordering options when selecting data from "links_recipients" */
export type Links_Recipients_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "links_recipients" */
export type Links_Recipients_Pk_Columns_Input = {
  id: Scalars['uuid'];
  link_id: Scalars['uuid'];
};

/** select columns of table "links_recipients" */
export type Links_Recipients_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id'
  /** column name */
  | 'read_at'
  /** column name */
  | 'received_at'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "links_recipients" */
export type Links_Recipients_Set_Input = {
  read_at: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "links_recipients" */
export type Links_Recipients_Update_Column = 
  /** column name */
  | 'read_at';

/** select columns of table "links" */
export type Links_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'description'
  /** column name */
  | 'happened_at'
  /** column name */
  | 'hidden'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'note'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'title'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'url';

/** input type for updating data in table "links" */
export type Links_Set_Input = {
  deleted_at: Maybe<Scalars['timestamptz']>;
  description: Maybe<Scalars['String']>;
  happened_at: Maybe<Scalars['timestamptz']>;
  hidden: Maybe<Scalars['Boolean']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  posted_by: Maybe<Scalars['uuid']>;
  title: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** update columns of table "links" */
export type Links_Update_Column = 
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'description'
  /** column name */
  | 'happened_at'
  /** column name */
  | 'hidden'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'note'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'title'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'url';

/** columns and relationships of "messages" */
export type Messages = {
  __typename?: 'messages';
  created_at: Scalars['timestamptz'];
  deleted_at: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An array relationship */
  messages_attachments: Array<Messages_Attachments>;
  /** An aggregated array relationship */
  messages_attachments_aggregate: Messages_Attachments_Aggregate;
  /** An array relationship */
  messages_recipients: Array<Messages_Recipients>;
  /** An aggregated array relationship */
  messages_recipients_aggregate: Messages_Recipients_Aggregate;
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  posted_by: Scalars['uuid'];
  text: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
};


/** columns and relationships of "messages" */
export type MessagesMessages_AttachmentsArgs = {
  distinct_on: Maybe<Array<Messages_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Attachments_Order_By>>;
  where: Maybe<Messages_Attachments_Bool_Exp>;
};


/** columns and relationships of "messages" */
export type MessagesMessages_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Attachments_Order_By>>;
  where: Maybe<Messages_Attachments_Bool_Exp>;
};


/** columns and relationships of "messages" */
export type MessagesMessages_RecipientsArgs = {
  distinct_on: Maybe<Array<Messages_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Recipients_Order_By>>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};


/** columns and relationships of "messages" */
export type MessagesMessages_Recipients_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Recipients_Order_By>>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};

/** aggregated selection of "messages" */
export type Messages_Aggregate = {
  __typename?: 'messages_aggregate';
  aggregate: Maybe<Messages_Aggregate_Fields>;
  nodes: Array<Messages>;
};

/** aggregate fields of "messages" */
export type Messages_Aggregate_Fields = {
  __typename?: 'messages_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Messages_Max_Fields>;
  min: Maybe<Messages_Min_Fields>;
};


/** aggregate fields of "messages" */
export type Messages_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Messages_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "messages" */
export type Messages_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Messages_Max_Order_By>;
  min: Maybe<Messages_Min_Order_By>;
};

/** columns and relationships of "messages_and_links" */
export type Messages_And_Links = {
  __typename?: 'messages_and_links';
  created_at: Scalars['timestamptz'];
  link_id: Scalars['uuid'];
  /** An object relationship */
  links: Links;
  message_id: Scalars['uuid'];
  /** An object relationship */
  messages: Messages;
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  type: Scalars['String'];
};

/** aggregated selection of "messages_and_links" */
export type Messages_And_Links_Aggregate = {
  __typename?: 'messages_and_links_aggregate';
  aggregate: Maybe<Messages_And_Links_Aggregate_Fields>;
  nodes: Array<Messages_And_Links>;
};

/** aggregate fields of "messages_and_links" */
export type Messages_And_Links_Aggregate_Fields = {
  __typename?: 'messages_and_links_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Messages_And_Links_Max_Fields>;
  min: Maybe<Messages_And_Links_Min_Fields>;
};


/** aggregate fields of "messages_and_links" */
export type Messages_And_Links_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Messages_And_Links_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "messages_and_links" */
export type Messages_And_Links_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Messages_And_Links_Max_Order_By>;
  min: Maybe<Messages_And_Links_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "messages_and_links". All fields are combined with a logical 'AND'. */
export type Messages_And_Links_Bool_Exp = {
  _and: Maybe<Array<Maybe<Messages_And_Links_Bool_Exp>>>;
  _not: Maybe<Messages_And_Links_Bool_Exp>;
  _or: Maybe<Array<Maybe<Messages_And_Links_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  links: Maybe<Links_Bool_Exp>;
  message_id: Maybe<Uuid_Comparison_Exp>;
  messages: Maybe<Messages_Bool_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  type: Maybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Messages_And_Links_Max_Fields = {
  __typename?: 'messages_and_links_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  link_id: Maybe<Scalars['uuid']>;
  message_id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "messages_and_links" */
export type Messages_And_Links_Max_Order_By = {
  created_at: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  message_id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  type: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Messages_And_Links_Min_Fields = {
  __typename?: 'messages_and_links_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  link_id: Maybe<Scalars['uuid']>;
  message_id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "messages_and_links" */
export type Messages_And_Links_Min_Order_By = {
  created_at: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  message_id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  type: Maybe<Order_By>;
};

/** ordering options when selecting data from "messages_and_links" */
export type Messages_And_Links_Order_By = {
  created_at: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  links: Maybe<Links_Order_By>;
  message_id: Maybe<Order_By>;
  messages: Maybe<Messages_Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  type: Maybe<Order_By>;
};

/** primary key columns input for table: "messages_and_links" */
export type Messages_And_Links_Pk_Columns_Input = {
  link_id: Scalars['uuid'];
  message_id: Scalars['uuid'];
  poll_id: Scalars['uuid'];
};

/** select columns of table "messages_and_links" */
export type Messages_And_Links_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'link_id'
  /** column name */
  | 'message_id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'type';

/** input type for inserting array relation for remote table "messages" */
export type Messages_Arr_Rel_Insert_Input = {
  data: Array<Messages_Insert_Input>;
  on_conflict: Maybe<Messages_On_Conflict>;
};

/** columns and relationships of "messages_attachments" */
export type Messages_Attachments = {
  __typename?: 'messages_attachments';
  created_at: Scalars['timestamptz'];
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  message: Messages;
  message_id: Scalars['uuid'];
  posted_by: Scalars['uuid'];
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  url: Maybe<Scalars['String']>;
};

/** aggregated selection of "messages_attachments" */
export type Messages_Attachments_Aggregate = {
  __typename?: 'messages_attachments_aggregate';
  aggregate: Maybe<Messages_Attachments_Aggregate_Fields>;
  nodes: Array<Messages_Attachments>;
};

/** aggregate fields of "messages_attachments" */
export type Messages_Attachments_Aggregate_Fields = {
  __typename?: 'messages_attachments_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Messages_Attachments_Max_Fields>;
  min: Maybe<Messages_Attachments_Min_Fields>;
};


/** aggregate fields of "messages_attachments" */
export type Messages_Attachments_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Messages_Attachments_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "messages_attachments" */
export type Messages_Attachments_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Messages_Attachments_Max_Order_By>;
  min: Maybe<Messages_Attachments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "messages_attachments" */
export type Messages_Attachments_Arr_Rel_Insert_Input = {
  data: Array<Messages_Attachments_Insert_Input>;
};

/** Boolean expression to filter rows from the table "messages_attachments". All fields are combined with a logical 'AND'. */
export type Messages_Attachments_Bool_Exp = {
  _and: Maybe<Array<Maybe<Messages_Attachments_Bool_Exp>>>;
  _not: Maybe<Messages_Attachments_Bool_Exp>;
  _or: Maybe<Array<Maybe<Messages_Attachments_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  file_id: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  message: Maybe<Messages_Bool_Exp>;
  message_id: Maybe<Uuid_Comparison_Exp>;
  posted_by: Maybe<Uuid_Comparison_Exp>;
  type: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  url: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "messages_attachments" */
export type Messages_Attachments_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  message: Maybe<Messages_Obj_Rel_Insert_Input>;
  message_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Messages_Attachments_Max_Fields = {
  __typename?: 'messages_attachments_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  message_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "messages_attachments" */
export type Messages_Attachments_Max_Order_By = {
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  message_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Messages_Attachments_Min_Fields = {
  __typename?: 'messages_attachments_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  file_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  message_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "messages_attachments" */
export type Messages_Attachments_Min_Order_By = {
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  message_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** response of any mutation on the table "messages_attachments" */
export type Messages_Attachments_Mutation_Response = {
  __typename?: 'messages_attachments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Messages_Attachments>;
};

/** input type for inserting object relation for remote table "messages_attachments" */
export type Messages_Attachments_Obj_Rel_Insert_Input = {
  data: Messages_Attachments_Insert_Input;
};

/** ordering options when selecting data from "messages_attachments" */
export type Messages_Attachments_Order_By = {
  created_at: Maybe<Order_By>;
  file_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  message: Maybe<Messages_Order_By>;
  message_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** primary key columns input for table: "messages_attachments" */
export type Messages_Attachments_Pk_Columns_Input = {
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  message_id: Scalars['uuid'];
};

/** select columns of table "messages_attachments" */
export type Messages_Attachments_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'file_id'
  /** column name */
  | 'id'
  /** column name */
  | 'message_id'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'url';

/** Boolean expression to filter rows from the table "messages". All fields are combined with a logical 'AND'. */
export type Messages_Bool_Exp = {
  _and: Maybe<Array<Maybe<Messages_Bool_Exp>>>;
  _not: Maybe<Messages_Bool_Exp>;
  _or: Maybe<Array<Maybe<Messages_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  deleted_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  messages_attachments: Maybe<Messages_Attachments_Bool_Exp>;
  messages_recipients: Maybe<Messages_Recipients_Bool_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  posted_by: Maybe<Uuid_Comparison_Exp>;
  text: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "messages" */
export type Messages_Constraint = 
  /** unique or primary key constraint */
  | 'messages_pkey';

/** input type for inserting data into table "messages" */
export type Messages_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  messages_attachments: Maybe<Messages_Attachments_Arr_Rel_Insert_Input>;
  messages_recipients: Maybe<Messages_Recipients_Arr_Rel_Insert_Input>;
  poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  poll_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Messages_Max_Fields = {
  __typename?: 'messages_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  deleted_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "messages" */
export type Messages_Max_Order_By = {
  created_at: Maybe<Order_By>;
  deleted_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  text: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Messages_Min_Fields = {
  __typename?: 'messages_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  deleted_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  posted_by: Maybe<Scalars['uuid']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "messages" */
export type Messages_Min_Order_By = {
  created_at: Maybe<Order_By>;
  deleted_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  text: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** response of any mutation on the table "messages" */
export type Messages_Mutation_Response = {
  __typename?: 'messages_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Messages>;
};

/** input type for inserting object relation for remote table "messages" */
export type Messages_Obj_Rel_Insert_Input = {
  data: Messages_Insert_Input;
  on_conflict: Maybe<Messages_On_Conflict>;
};

/** on conflict condition type for table "messages" */
export type Messages_On_Conflict = {
  constraint: Messages_Constraint;
  update_columns: Array<Messages_Update_Column>;
  where: Maybe<Messages_Bool_Exp>;
};

/** ordering options when selecting data from "messages" */
export type Messages_Order_By = {
  created_at: Maybe<Order_By>;
  deleted_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  messages_attachments_aggregate: Maybe<Messages_Attachments_Aggregate_Order_By>;
  messages_recipients_aggregate: Maybe<Messages_Recipients_Aggregate_Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  posted_by: Maybe<Order_By>;
  text: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "messages" */
export type Messages_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "messages_recipients" */
export type Messages_Recipients = {
  __typename?: 'messages_recipients';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  message: Messages;
  message_id: Scalars['uuid'];
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "messages_recipients" */
export type Messages_Recipients_Aggregate = {
  __typename?: 'messages_recipients_aggregate';
  aggregate: Maybe<Messages_Recipients_Aggregate_Fields>;
  nodes: Array<Messages_Recipients>;
};

/** aggregate fields of "messages_recipients" */
export type Messages_Recipients_Aggregate_Fields = {
  __typename?: 'messages_recipients_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Messages_Recipients_Max_Fields>;
  min: Maybe<Messages_Recipients_Min_Fields>;
};


/** aggregate fields of "messages_recipients" */
export type Messages_Recipients_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Messages_Recipients_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "messages_recipients" */
export type Messages_Recipients_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Messages_Recipients_Max_Order_By>;
  min: Maybe<Messages_Recipients_Min_Order_By>;
};

/** input type for inserting array relation for remote table "messages_recipients" */
export type Messages_Recipients_Arr_Rel_Insert_Input = {
  data: Array<Messages_Recipients_Insert_Input>;
  on_conflict: Maybe<Messages_Recipients_On_Conflict>;
};

/** Boolean expression to filter rows from the table "messages_recipients". All fields are combined with a logical 'AND'. */
export type Messages_Recipients_Bool_Exp = {
  _and: Maybe<Array<Maybe<Messages_Recipients_Bool_Exp>>>;
  _not: Maybe<Messages_Recipients_Bool_Exp>;
  _or: Maybe<Array<Maybe<Messages_Recipients_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  message: Maybe<Messages_Bool_Exp>;
  message_id: Maybe<Uuid_Comparison_Exp>;
  read_at: Maybe<Timestamptz_Comparison_Exp>;
  received_at: Maybe<Timestamptz_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  user_id: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "messages_recipients" */
export type Messages_Recipients_Constraint = 
  /** unique or primary key constraint */
  | 'messages_recipients_id_key'
  /** unique or primary key constraint */
  | 'messages_recipients_pkey';

/** input type for inserting data into table "messages_recipients" */
export type Messages_Recipients_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  message: Maybe<Messages_Obj_Rel_Insert_Input>;
  message_id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Messages_Recipients_Max_Fields = {
  __typename?: 'messages_recipients_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  message_id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "messages_recipients" */
export type Messages_Recipients_Max_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  message_id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Messages_Recipients_Min_Fields = {
  __typename?: 'messages_recipients_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  message_id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "messages_recipients" */
export type Messages_Recipients_Min_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  message_id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "messages_recipients" */
export type Messages_Recipients_Mutation_Response = {
  __typename?: 'messages_recipients_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Messages_Recipients>;
};

/** input type for inserting object relation for remote table "messages_recipients" */
export type Messages_Recipients_Obj_Rel_Insert_Input = {
  data: Messages_Recipients_Insert_Input;
  on_conflict: Maybe<Messages_Recipients_On_Conflict>;
};

/** on conflict condition type for table "messages_recipients" */
export type Messages_Recipients_On_Conflict = {
  constraint: Messages_Recipients_Constraint;
  update_columns: Array<Messages_Recipients_Update_Column>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};

/** ordering options when selecting data from "messages_recipients" */
export type Messages_Recipients_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  message: Maybe<Messages_Order_By>;
  message_id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "messages_recipients" */
export type Messages_Recipients_Pk_Columns_Input = {
  id: Scalars['uuid'];
  message_id: Scalars['uuid'];
};

/** select columns of table "messages_recipients" */
export type Messages_Recipients_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'message_id'
  /** column name */
  | 'read_at'
  /** column name */
  | 'received_at'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "messages_recipients" */
export type Messages_Recipients_Set_Input = {
  read_at: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "messages_recipients" */
export type Messages_Recipients_Update_Column = 
  /** column name */
  | 'read_at';

/** select columns of table "messages" */
export type Messages_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'posted_by'
  /** column name */
  | 'text'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "messages" */
export type Messages_Set_Input = {
  deleted_at: Maybe<Scalars['timestamptz']>;
  text: Maybe<Scalars['String']>;
};

/** update columns of table "messages" */
export type Messages_Update_Column = 
  /** column name */
  | 'deleted_at'
  /** column name */
  | 'text';

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "blocked_users" */
  delete_blocked_users: Maybe<Blocked_Users_Mutation_Response>;
  /** delete single row from the table: "blocked_users" */
  delete_blocked_users_by_pk: Maybe<Blocked_Users>;
  /** delete data from the table: "downvotes" */
  delete_downvotes: Maybe<Downvotes_Mutation_Response>;
  /** delete single row from the table: "downvotes" */
  delete_downvotes_by_pk: Maybe<Downvotes>;
  /** delete data from the table: "links_polls" */
  delete_links_polls: Maybe<Links_Polls_Mutation_Response>;
  /** delete single row from the table: "links_polls" */
  delete_links_polls_by_pk: Maybe<Links_Polls>;
  /** delete data from the table: "polls" */
  delete_polls: Maybe<Polls_Mutation_Response>;
  /** delete single row from the table: "polls" */
  delete_polls_by_pk: Maybe<Polls>;
  /** delete data from the table: "upvotes" */
  delete_upvotes: Maybe<Upvotes_Mutation_Response>;
  /** delete single row from the table: "upvotes" */
  delete_upvotes_by_pk: Maybe<Upvotes>;
  /** delete data from the table: "users_followed_polls" */
  delete_users_followed_polls: Maybe<Users_Followed_Polls_Mutation_Response>;
  /** delete single row from the table: "users_followed_polls" */
  delete_users_followed_polls_by_pk: Maybe<Users_Followed_Polls>;
  /** delete data from the table: "users_polls" */
  delete_users_polls: Maybe<Users_Polls_Mutation_Response>;
  /** delete single row from the table: "users_polls" */
  delete_users_polls_by_pk: Maybe<Users_Polls>;
  /** insert data into the table: "blocked_users" */
  insert_blocked_users: Maybe<Blocked_Users_Mutation_Response>;
  /** insert a single row into the table: "blocked_users" */
  insert_blocked_users_one: Maybe<Blocked_Users>;
  /** insert data into the table: "comments" */
  insert_comments: Maybe<Comments_Mutation_Response>;
  /** insert data into the table: "comments_attachments" */
  insert_comments_attachments: Maybe<Comments_Attachments_Mutation_Response>;
  /** insert a single row into the table: "comments_attachments" */
  insert_comments_attachments_one: Maybe<Comments_Attachments>;
  /** insert a single row into the table: "comments" */
  insert_comments_one: Maybe<Comments>;
  /** insert data into the table: "downvotes" */
  insert_downvotes: Maybe<Downvotes_Mutation_Response>;
  /** insert a single row into the table: "downvotes" */
  insert_downvotes_one: Maybe<Downvotes>;
  /** insert data into the table: "links" */
  insert_links: Maybe<Links_Mutation_Response>;
  /** insert data into the table: "links_attachments" */
  insert_links_attachments: Maybe<Links_Attachments_Mutation_Response>;
  /** insert a single row into the table: "links_attachments" */
  insert_links_attachments_one: Maybe<Links_Attachments>;
  /** insert a single row into the table: "links" */
  insert_links_one: Maybe<Links>;
  /** insert data into the table: "links_polls" */
  insert_links_polls: Maybe<Links_Polls_Mutation_Response>;
  /** insert a single row into the table: "links_polls" */
  insert_links_polls_one: Maybe<Links_Polls>;
  /** insert data into the table: "links_recipients" */
  insert_links_recipients: Maybe<Links_Recipients_Mutation_Response>;
  /** insert a single row into the table: "links_recipients" */
  insert_links_recipients_one: Maybe<Links_Recipients>;
  /** insert data into the table: "messages" */
  insert_messages: Maybe<Messages_Mutation_Response>;
  /** insert data into the table: "messages_attachments" */
  insert_messages_attachments: Maybe<Messages_Attachments_Mutation_Response>;
  /** insert a single row into the table: "messages_attachments" */
  insert_messages_attachments_one: Maybe<Messages_Attachments>;
  /** insert a single row into the table: "messages" */
  insert_messages_one: Maybe<Messages>;
  /** insert data into the table: "messages_recipients" */
  insert_messages_recipients: Maybe<Messages_Recipients_Mutation_Response>;
  /** insert a single row into the table: "messages_recipients" */
  insert_messages_recipients_one: Maybe<Messages_Recipients>;
  /** insert data into the table: "polls" */
  insert_polls: Maybe<Polls_Mutation_Response>;
  /** insert a single row into the table: "polls" */
  insert_polls_one: Maybe<Polls>;
  /** insert data into the table: "recipients" */
  insert_recipients: Maybe<Recipients_Mutation_Response>;
  /** insert a single row into the table: "recipients" */
  insert_recipients_one: Maybe<Recipients>;
  /** insert data into the table: "reminders" */
  insert_reminders: Maybe<Reminders_Mutation_Response>;
  /** insert a single row into the table: "reminders" */
  insert_reminders_one: Maybe<Reminders>;
  /** insert data into the table: "reported_links" */
  insert_reported_links: Maybe<Reported_Links_Mutation_Response>;
  /** insert data into the table: "upvotes" */
  insert_upvotes: Maybe<Upvotes_Mutation_Response>;
  /** insert a single row into the table: "upvotes" */
  insert_upvotes_one: Maybe<Upvotes>;
  /** insert data into the table: "users_followed_polls" */
  insert_users_followed_polls: Maybe<Users_Followed_Polls_Mutation_Response>;
  /** insert a single row into the table: "users_followed_polls" */
  insert_users_followed_polls_one: Maybe<Users_Followed_Polls>;
  /** insert data into the table: "users_polls" */
  insert_users_polls: Maybe<Users_Polls_Mutation_Response>;
  /** insert a single row into the table: "users_polls" */
  insert_users_polls_one: Maybe<Users_Polls>;
  /** insert data into the table: "webhooks" */
  insert_webhooks: Maybe<Webhooks_Mutation_Response>;
  /** insert a single row into the table: "webhooks" */
  insert_webhooks_one: Maybe<Webhooks>;
  nest_askResetUserPassword: SuccessObjectDto;
  nest_deleteFile: SuccessObjectDto;
  nest_joinPrivatePoll: SuccessObjectDto;
  nest_loginUser: SessionObject;
  nest_resetUserPassword: SuccessObjectDto;
  nest_uploadFile: File;
  nest_uploadPollPicture: SuccessObjectDto;
  nest_userUploadProfilePicture: SuccessObjectDto;
  /** update data of the table: "links" */
  update_links: Maybe<Links_Mutation_Response>;
  /** update single row of the table: "links" */
  update_links_by_pk: Maybe<Links>;
  /** update data of the table: "links_recipients" */
  update_links_recipients: Maybe<Links_Recipients_Mutation_Response>;
  /** update single row of the table: "links_recipients" */
  update_links_recipients_by_pk: Maybe<Links_Recipients>;
  /** update data of the table: "messages" */
  update_messages: Maybe<Messages_Mutation_Response>;
  /** update single row of the table: "messages" */
  update_messages_by_pk: Maybe<Messages>;
  /** update data of the table: "messages_recipients" */
  update_messages_recipients: Maybe<Messages_Recipients_Mutation_Response>;
  /** update single row of the table: "messages_recipients" */
  update_messages_recipients_by_pk: Maybe<Messages_Recipients>;
  /** update data of the table: "polls" */
  update_polls: Maybe<Polls_Mutation_Response>;
  /** update single row of the table: "polls" */
  update_polls_by_pk: Maybe<Polls>;
  /** update data of the table: "recipients" */
  update_recipients: Maybe<Recipients_Mutation_Response>;
  /** update single row of the table: "recipients" */
  update_recipients_by_pk: Maybe<Recipients>;
  /** update data of the table: "users" */
  update_users: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk: Maybe<Users>;
  /** update data of the table: "webhooks" */
  update_webhooks: Maybe<Webhooks_Mutation_Response>;
  /** update single row of the table: "webhooks" */
  update_webhooks_by_pk: Maybe<Webhooks>;
};


/** mutation root */
export type Mutation_RootDelete_Blocked_UsersArgs = {
  where: Blocked_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blocked_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DownvotesArgs = {
  where: Downvotes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Downvotes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Links_PollsArgs = {
  where: Links_Polls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Links_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PollsArgs = {
  where: Polls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UpvotesArgs = {
  where: Upvotes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Upvotes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Users_Followed_PollsArgs = {
  where: Users_Followed_Polls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_Followed_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Users_PollsArgs = {
  where: Users_Polls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_Blocked_UsersArgs = {
  objects: Array<Blocked_Users_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Blocked_Users_OneArgs = {
  object: Blocked_Users_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: Array<Comments_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Comments_AttachmentsArgs = {
  objects: Array<Comments_Attachments_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Comments_Attachments_OneArgs = {
  object: Comments_Attachments_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Comments_OneArgs = {
  object: Comments_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_DownvotesArgs = {
  objects: Array<Downvotes_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Downvotes_OneArgs = {
  object: Downvotes_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_LinksArgs = {
  objects: Array<Links_Insert_Input>;
  on_conflict: Maybe<Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_AttachmentsArgs = {
  objects: Array<Links_Attachments_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Links_Attachments_OneArgs = {
  object: Links_Attachments_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Links_OneArgs = {
  object: Links_Insert_Input;
  on_conflict: Maybe<Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_PollsArgs = {
  objects: Array<Links_Polls_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Links_Polls_OneArgs = {
  object: Links_Polls_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Links_RecipientsArgs = {
  objects: Array<Links_Recipients_Insert_Input>;
  on_conflict: Maybe<Links_Recipients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_Recipients_OneArgs = {
  object: Links_Recipients_Insert_Input;
  on_conflict: Maybe<Links_Recipients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MessagesArgs = {
  objects: Array<Messages_Insert_Input>;
  on_conflict: Maybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_AttachmentsArgs = {
  objects: Array<Messages_Attachments_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_Attachments_OneArgs = {
  object: Messages_Attachments_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Messages_OneArgs = {
  object: Messages_Insert_Input;
  on_conflict: Maybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_RecipientsArgs = {
  objects: Array<Messages_Recipients_Insert_Input>;
  on_conflict: Maybe<Messages_Recipients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_Recipients_OneArgs = {
  object: Messages_Recipients_Insert_Input;
  on_conflict: Maybe<Messages_Recipients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PollsArgs = {
  objects: Array<Polls_Insert_Input>;
  on_conflict: Maybe<Polls_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Polls_OneArgs = {
  object: Polls_Insert_Input;
  on_conflict: Maybe<Polls_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RecipientsArgs = {
  objects: Array<Recipients_Insert_Input>;
  on_conflict: Maybe<Recipients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipients_OneArgs = {
  object: Recipients_Insert_Input;
  on_conflict: Maybe<Recipients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RemindersArgs = {
  objects: Array<Reminders_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Reminders_OneArgs = {
  object: Reminders_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Reported_LinksArgs = {
  objects: Array<Reported_Links_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_UpvotesArgs = {
  objects: Array<Upvotes_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Upvotes_OneArgs = {
  object: Upvotes_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Users_Followed_PollsArgs = {
  objects: Array<Users_Followed_Polls_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Users_Followed_Polls_OneArgs = {
  object: Users_Followed_Polls_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Users_PollsArgs = {
  objects: Array<Users_Polls_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Users_Polls_OneArgs = {
  object: Users_Polls_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_WebhooksArgs = {
  objects: Array<Webhooks_Insert_Input>;
  on_conflict: Maybe<Webhooks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Webhooks_OneArgs = {
  object: Webhooks_Insert_Input;
  on_conflict: Maybe<Webhooks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootNest_AskResetUserPasswordArgs = {
  email: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_DeleteFileArgs = {
  fileId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_JoinPrivatePollArgs = {
  code: Scalars['String'];
  pollId: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_LoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_ResetUserPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_UploadFileArgs = {
  file: Scalars['Upload'];
  resourceId: Scalars['String'];
  resourceType: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_UploadPollPictureArgs = {
  file: Scalars['Upload'];
  pollId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootNest_UserUploadProfilePictureArgs = {
  file: Scalars['Upload'];
};


/** mutation root */
export type Mutation_RootUpdate_LinksArgs = {
  _set: Maybe<Links_Set_Input>;
  where: Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Links_By_PkArgs = {
  _set: Maybe<Links_Set_Input>;
  pk_columns: Links_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Links_RecipientsArgs = {
  _set: Maybe<Links_Recipients_Set_Input>;
  where: Links_Recipients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Links_Recipients_By_PkArgs = {
  _set: Maybe<Links_Recipients_Set_Input>;
  pk_columns: Links_Recipients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MessagesArgs = {
  _set: Maybe<Messages_Set_Input>;
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_By_PkArgs = {
  _set: Maybe<Messages_Set_Input>;
  pk_columns: Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_RecipientsArgs = {
  _set: Maybe<Messages_Recipients_Set_Input>;
  where: Messages_Recipients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_Recipients_By_PkArgs = {
  _set: Maybe<Messages_Recipients_Set_Input>;
  pk_columns: Messages_Recipients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PollsArgs = {
  _set: Maybe<Polls_Set_Input>;
  where: Polls_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Polls_By_PkArgs = {
  _set: Maybe<Polls_Set_Input>;
  pk_columns: Polls_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RecipientsArgs = {
  _set: Maybe<Recipients_Set_Input>;
  where: Recipients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipients_By_PkArgs = {
  _set: Maybe<Recipients_Set_Input>;
  pk_columns: Recipients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _append: Maybe<Users_Append_Input>;
  _delete_at_path: Maybe<Users_Delete_At_Path_Input>;
  _delete_elem: Maybe<Users_Delete_Elem_Input>;
  _delete_key: Maybe<Users_Delete_Key_Input>;
  _prepend: Maybe<Users_Prepend_Input>;
  _set: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _append: Maybe<Users_Append_Input>;
  _delete_at_path: Maybe<Users_Delete_At_Path_Input>;
  _delete_elem: Maybe<Users_Delete_Elem_Input>;
  _delete_key: Maybe<Users_Delete_Key_Input>;
  _prepend: Maybe<Users_Prepend_Input>;
  _set: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WebhooksArgs = {
  _set: Maybe<Webhooks_Set_Input>;
  where: Webhooks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Webhooks_By_PkArgs = {
  _set: Maybe<Webhooks_Set_Input>;
  pk_columns: Webhooks_Pk_Columns_Input;
};

/** column ordering options */
export type Order_By = 
  /** in the ascending order, nulls last */
  | 'asc'
  /** in the ascending order, nulls first */
  | 'asc_nulls_first'
  /** in the ascending order, nulls last */
  | 'asc_nulls_last'
  /** in the descending order, nulls first */
  | 'desc'
  /** in the descending order, nulls first */
  | 'desc_nulls_first'
  /** in the descending order, nulls last */
  | 'desc_nulls_last';

/** columns and relationships of "polls" */
export type Polls = {
  __typename?: 'polls';
  code: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Scalars['uuid'];
  description: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['uuid'];
  is_list_first: Scalars['Boolean'];
  /** An array relationship */
  links_in_poll: Array<Links_Polls>;
  /** An aggregated array relationship */
  links_in_poll_aggregate: Links_Polls_Aggregate;
  /** An array relationship */
  messages: Array<Messages>;
  /** An aggregated array relationship */
  messages_aggregate: Messages_Aggregate;
  /** A computed field, executes function "get_messages_and_links_from_poll" */
  messages_and_links: Maybe<Array<Messages_And_Links>>;
  name: Scalars['String'];
  /** An object relationship */
  parent_poll: Maybe<Polls>;
  picture: Maybe<Scalars['String']>;
  poll_parent_id: Maybe<Scalars['uuid']>;
  /** An array relationship */
  subpolls: Array<Polls>;
  /** An aggregated array relationship */
  subpolls_aggregate: Polls_Aggregate;
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  /** An array relationship */
  users_in_poll: Array<Users_Polls>;
  /** An aggregated array relationship */
  users_in_poll_aggregate: Users_Polls_Aggregate;
  /** An array relationship */
  webhooks: Array<Webhooks>;
  /** An aggregated array relationship */
  webhooks_aggregate: Webhooks_Aggregate;
};


/** columns and relationships of "polls" */
export type PollsLinks_In_PollArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsLinks_In_Poll_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsMessagesArgs = {
  distinct_on: Maybe<Array<Messages_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Order_By>>;
  where: Maybe<Messages_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsMessages_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Order_By>>;
  where: Maybe<Messages_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsMessages_And_LinksArgs = {
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsSubpollsArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsSubpolls_AggregateArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsUsers_In_PollArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsUsers_In_Poll_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsWebhooksArgs = {
  distinct_on: Maybe<Array<Webhooks_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Webhooks_Order_By>>;
  where: Maybe<Webhooks_Bool_Exp>;
};


/** columns and relationships of "polls" */
export type PollsWebhooks_AggregateArgs = {
  distinct_on: Maybe<Array<Webhooks_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Webhooks_Order_By>>;
  where: Maybe<Webhooks_Bool_Exp>;
};

/** aggregated selection of "polls" */
export type Polls_Aggregate = {
  __typename?: 'polls_aggregate';
  aggregate: Maybe<Polls_Aggregate_Fields>;
  nodes: Array<Polls>;
};

/** aggregate fields of "polls" */
export type Polls_Aggregate_Fields = {
  __typename?: 'polls_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Polls_Max_Fields>;
  min: Maybe<Polls_Min_Fields>;
};


/** aggregate fields of "polls" */
export type Polls_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Polls_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "polls" */
export type Polls_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Polls_Max_Order_By>;
  min: Maybe<Polls_Min_Order_By>;
};

/** input type for inserting array relation for remote table "polls" */
export type Polls_Arr_Rel_Insert_Input = {
  data: Array<Polls_Insert_Input>;
  on_conflict: Maybe<Polls_On_Conflict>;
};

/** Boolean expression to filter rows from the table "polls". All fields are combined with a logical 'AND'. */
export type Polls_Bool_Exp = {
  _and: Maybe<Array<Maybe<Polls_Bool_Exp>>>;
  _not: Maybe<Polls_Bool_Exp>;
  _or: Maybe<Array<Maybe<Polls_Bool_Exp>>>;
  code: Maybe<String_Comparison_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  created_by: Maybe<Uuid_Comparison_Exp>;
  description: Maybe<String_Comparison_Exp>;
  icon: Maybe<String_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  is_list_first: Maybe<Boolean_Comparison_Exp>;
  links_in_poll: Maybe<Links_Polls_Bool_Exp>;
  messages: Maybe<Messages_Bool_Exp>;
  name: Maybe<String_Comparison_Exp>;
  parent_poll: Maybe<Polls_Bool_Exp>;
  picture: Maybe<String_Comparison_Exp>;
  poll_parent_id: Maybe<Uuid_Comparison_Exp>;
  subpolls: Maybe<Polls_Bool_Exp>;
  type: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  users_in_poll: Maybe<Users_Polls_Bool_Exp>;
  webhooks: Maybe<Webhooks_Bool_Exp>;
};

/** unique or primary key constraints on table "polls" */
export type Polls_Constraint = 
  /** unique or primary key constraint */
  | 'polls_code_key'
  /** unique or primary key constraint */
  | 'polls_id_key'
  /** unique or primary key constraint */
  | 'polls_pkey';

/** input type for inserting data into table "polls" */
export type Polls_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  links_in_poll: Maybe<Links_Polls_Arr_Rel_Insert_Input>;
  messages: Maybe<Messages_Arr_Rel_Insert_Input>;
  name: Maybe<Scalars['String']>;
  parent_poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  picture: Maybe<Scalars['String']>;
  poll_parent_id: Maybe<Scalars['uuid']>;
  subpolls: Maybe<Polls_Arr_Rel_Insert_Input>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  users_in_poll: Maybe<Users_Polls_Arr_Rel_Insert_Input>;
  webhooks: Maybe<Webhooks_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Polls_Max_Fields = {
  __typename?: 'polls_max_fields';
  code: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  picture: Maybe<Scalars['String']>;
  poll_parent_id: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "polls" */
export type Polls_Max_Order_By = {
  code: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  description: Maybe<Order_By>;
  icon: Maybe<Order_By>;
  id: Maybe<Order_By>;
  name: Maybe<Order_By>;
  picture: Maybe<Order_By>;
  poll_parent_id: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Polls_Min_Fields = {
  __typename?: 'polls_min_fields';
  code: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  picture: Maybe<Scalars['String']>;
  poll_parent_id: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "polls" */
export type Polls_Min_Order_By = {
  code: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  description: Maybe<Order_By>;
  icon: Maybe<Order_By>;
  id: Maybe<Order_By>;
  name: Maybe<Order_By>;
  picture: Maybe<Order_By>;
  poll_parent_id: Maybe<Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** response of any mutation on the table "polls" */
export type Polls_Mutation_Response = {
  __typename?: 'polls_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Polls>;
};

/** input type for inserting object relation for remote table "polls" */
export type Polls_Obj_Rel_Insert_Input = {
  data: Polls_Insert_Input;
  on_conflict: Maybe<Polls_On_Conflict>;
};

/** on conflict condition type for table "polls" */
export type Polls_On_Conflict = {
  constraint: Polls_Constraint;
  update_columns: Array<Polls_Update_Column>;
  where: Maybe<Polls_Bool_Exp>;
};

/** ordering options when selecting data from "polls" */
export type Polls_Order_By = {
  code: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  description: Maybe<Order_By>;
  icon: Maybe<Order_By>;
  id: Maybe<Order_By>;
  is_list_first: Maybe<Order_By>;
  links_in_poll_aggregate: Maybe<Links_Polls_Aggregate_Order_By>;
  messages_aggregate: Maybe<Messages_Aggregate_Order_By>;
  name: Maybe<Order_By>;
  parent_poll: Maybe<Polls_Order_By>;
  picture: Maybe<Order_By>;
  poll_parent_id: Maybe<Order_By>;
  subpolls_aggregate: Maybe<Polls_Aggregate_Order_By>;
  type: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  users_in_poll_aggregate: Maybe<Users_Polls_Aggregate_Order_By>;
  webhooks_aggregate: Maybe<Webhooks_Aggregate_Order_By>;
};

/** primary key columns input for table: "polls" */
export type Polls_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "polls" */
export type Polls_Select_Column = 
  /** column name */
  | 'code'
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'description'
  /** column name */
  | 'icon'
  /** column name */
  | 'id'
  /** column name */
  | 'is_list_first'
  /** column name */
  | 'name'
  /** column name */
  | 'picture'
  /** column name */
  | 'poll_parent_id'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "polls" */
export type Polls_Set_Input = {
  description: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  is_list_first: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  topic_id: Maybe<Scalars['uuid']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "polls" */
export type Polls_Update_Column = 
  /** column name */
  | 'description'
  /** column name */
  | 'icon'
  /** column name */
  | 'is_list_first'
  /** column name */
  | 'name'
  /** column name */
  | 'topic_id'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "blocked_users" */
  blocked_users: Array<Blocked_Users>;
  /** fetch aggregated fields from the table: "blocked_users" */
  blocked_users_aggregate: Blocked_Users_Aggregate;
  /** fetch data from the table: "blocked_users" using primary key columns */
  blocked_users_by_pk: Maybe<Blocked_Users>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments_attachments" */
  comments_attachments: Array<Comments_Attachments>;
  /** fetch aggregated fields from the table: "comments_attachments" */
  comments_attachments_aggregate: Comments_Attachments_Aggregate;
  /** fetch data from the table: "comments_attachments" using primary key columns */
  comments_attachments_by_pk: Maybe<Comments_Attachments>;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk: Maybe<Comments>;
  /** fetch data from the table: "downvotes" */
  downvotes: Array<Downvotes>;
  /** fetch aggregated fields from the table: "downvotes" */
  downvotes_aggregate: Downvotes_Aggregate;
  /** fetch data from the table: "downvotes" using primary key columns */
  downvotes_by_pk: Maybe<Downvotes>;
  getMewtwoForPollNameByUserId: Array<Link>;
  getMewtwoForSubpollNameByUserId: Array<Link>;
  /** execute function "get_messages_and_links" which returns "messages_and_links" */
  get_messages_and_links: Array<Messages_And_Links>;
  /** execute function "get_messages_and_links" and query aggregates on result of table type "messages_and_links" */
  get_messages_and_links_aggregate: Messages_And_Links_Aggregate;
  /** fetch data from the table: "links" */
  links: Array<Links>;
  /** fetch aggregated fields from the table: "links" */
  links_aggregate: Links_Aggregate;
  /** fetch data from the table: "links_attachments" */
  links_attachments: Array<Links_Attachments>;
  /** fetch aggregated fields from the table: "links_attachments" */
  links_attachments_aggregate: Links_Attachments_Aggregate;
  /** fetch data from the table: "links_attachments" using primary key columns */
  links_attachments_by_pk: Maybe<Links_Attachments>;
  /** fetch data from the table: "links" using primary key columns */
  links_by_pk: Maybe<Links>;
  /** fetch data from the table: "links_polls" */
  links_polls: Array<Links_Polls>;
  /** fetch aggregated fields from the table: "links_polls" */
  links_polls_aggregate: Links_Polls_Aggregate;
  /** fetch data from the table: "links_polls" using primary key columns */
  links_polls_by_pk: Maybe<Links_Polls>;
  /** fetch data from the table: "links_recipients" */
  links_recipients: Array<Links_Recipients>;
  /** fetch aggregated fields from the table: "links_recipients" */
  links_recipients_aggregate: Links_Recipients_Aggregate;
  /** fetch data from the table: "links_recipients" using primary key columns */
  links_recipients_by_pk: Maybe<Links_Recipients>;
  /** fetch data from the table: "messages" */
  messages: Array<Messages>;
  /** fetch aggregated fields from the table: "messages" */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages_and_links" */
  messages_and_links: Array<Messages_And_Links>;
  /** fetch aggregated fields from the table: "messages_and_links" */
  messages_and_links_aggregate: Messages_And_Links_Aggregate;
  /** fetch data from the table: "messages_and_links" using primary key columns */
  messages_and_links_by_pk: Maybe<Messages_And_Links>;
  /** fetch data from the table: "messages_attachments" */
  messages_attachments: Array<Messages_Attachments>;
  /** fetch aggregated fields from the table: "messages_attachments" */
  messages_attachments_aggregate: Messages_Attachments_Aggregate;
  /** fetch data from the table: "messages_attachments" using primary key columns */
  messages_attachments_by_pk: Maybe<Messages_Attachments>;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk: Maybe<Messages>;
  /** fetch data from the table: "messages_recipients" */
  messages_recipients: Array<Messages_Recipients>;
  /** fetch aggregated fields from the table: "messages_recipients" */
  messages_recipients_aggregate: Messages_Recipients_Aggregate;
  /** fetch data from the table: "messages_recipients" using primary key columns */
  messages_recipients_by_pk: Maybe<Messages_Recipients>;
  nest_getMewtwoById: Array<Link>;
  nest_getPollName: Poll;
  /** fetch data from the table: "polls" */
  polls: Array<Polls>;
  /** fetch aggregated fields from the table: "polls" */
  polls_aggregate: Polls_Aggregate;
  /** fetch data from the table: "polls" using primary key columns */
  polls_by_pk: Maybe<Polls>;
  /** fetch data from the table: "recipients" */
  recipients: Array<Recipients>;
  /** fetch aggregated fields from the table: "recipients" */
  recipients_aggregate: Recipients_Aggregate;
  /** fetch data from the table: "recipients" using primary key columns */
  recipients_by_pk: Maybe<Recipients>;
  /** fetch data from the table: "reminders" */
  reminders: Array<Reminders>;
  /** fetch aggregated fields from the table: "reminders" */
  reminders_aggregate: Reminders_Aggregate;
  /** fetch data from the table: "reminders" using primary key columns */
  reminders_by_pk: Maybe<Reminders>;
  /** fetch data from the table: "upvotes" */
  upvotes: Array<Upvotes>;
  /** fetch aggregated fields from the table: "upvotes" */
  upvotes_aggregate: Upvotes_Aggregate;
  /** fetch data from the table: "upvotes" using primary key columns */
  upvotes_by_pk: Maybe<Upvotes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
  /** fetch data from the table: "users_followed_polls" */
  users_followed_polls: Array<Users_Followed_Polls>;
  /** fetch aggregated fields from the table: "users_followed_polls" */
  users_followed_polls_aggregate: Users_Followed_Polls_Aggregate;
  /** fetch data from the table: "users_followed_polls" using primary key columns */
  users_followed_polls_by_pk: Maybe<Users_Followed_Polls>;
  /** fetch data from the table: "users_polls" */
  users_polls: Array<Users_Polls>;
  /** fetch aggregated fields from the table: "users_polls" */
  users_polls_aggregate: Users_Polls_Aggregate;
  /** fetch data from the table: "users_polls" using primary key columns */
  users_polls_by_pk: Maybe<Users_Polls>;
  /** fetch data from the table: "webhooks" */
  webhooks: Array<Webhooks>;
  /** fetch aggregated fields from the table: "webhooks" */
  webhooks_aggregate: Webhooks_Aggregate;
  /** fetch data from the table: "webhooks" using primary key columns */
  webhooks_by_pk: Maybe<Webhooks>;
};


/** query root */
export type Query_RootBlocked_UsersArgs = {
  distinct_on: Maybe<Array<Blocked_Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Blocked_Users_Order_By>>;
  where: Maybe<Blocked_Users_Bool_Exp>;
};


/** query root */
export type Query_RootBlocked_Users_AggregateArgs = {
  distinct_on: Maybe<Array<Blocked_Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Blocked_Users_Order_By>>;
  where: Maybe<Blocked_Users_Bool_Exp>;
};


/** query root */
export type Query_RootBlocked_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootCommentsArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** query root */
export type Query_RootComments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** query root */
export type Query_RootComments_AttachmentsArgs = {
  distinct_on: Maybe<Array<Comments_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Attachments_Order_By>>;
  where: Maybe<Comments_Attachments_Bool_Exp>;
};


/** query root */
export type Query_RootComments_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Attachments_Order_By>>;
  where: Maybe<Comments_Attachments_Bool_Exp>;
};


/** query root */
export type Query_RootComments_Attachments_By_PkArgs = {
  comment_id: Scalars['uuid'];
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootComments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootDownvotesArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** query root */
export type Query_RootDownvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** query root */
export type Query_RootDownvotes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootGetMewtwoForPollNameByUserIdArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootGetMewtwoForSubpollNameByUserIdArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootGet_Messages_And_LinksArgs = {
  args: Get_Messages_And_Links_Args;
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** query root */
export type Query_RootGet_Messages_And_Links_AggregateArgs = {
  args: Get_Messages_And_Links_Args;
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** query root */
export type Query_RootLinksArgs = {
  distinct_on: Maybe<Array<Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Order_By>>;
  where: Maybe<Links_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Order_By>>;
  where: Maybe<Links_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_AttachmentsArgs = {
  distinct_on: Maybe<Array<Links_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Attachments_Order_By>>;
  where: Maybe<Links_Attachments_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Attachments_Order_By>>;
  where: Maybe<Links_Attachments_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_Attachments_By_PkArgs = {
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  link_id: Scalars['uuid'];
};


/** query root */
export type Query_RootLinks_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootLinks_PollsArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootLinks_RecipientsArgs = {
  distinct_on: Maybe<Array<Links_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Recipients_Order_By>>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_Recipients_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Recipients_Order_By>>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};


/** query root */
export type Query_RootLinks_Recipients_By_PkArgs = {
  id: Scalars['uuid'];
  link_id: Scalars['uuid'];
};


/** query root */
export type Query_RootMessagesArgs = {
  distinct_on: Maybe<Array<Messages_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Order_By>>;
  where: Maybe<Messages_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Order_By>>;
  where: Maybe<Messages_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_And_LinksArgs = {
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_And_Links_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_And_Links_By_PkArgs = {
  link_id: Scalars['uuid'];
  message_id: Scalars['uuid'];
  poll_id: Scalars['uuid'];
};


/** query root */
export type Query_RootMessages_AttachmentsArgs = {
  distinct_on: Maybe<Array<Messages_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Attachments_Order_By>>;
  where: Maybe<Messages_Attachments_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Attachments_Order_By>>;
  where: Maybe<Messages_Attachments_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_Attachments_By_PkArgs = {
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  message_id: Scalars['uuid'];
};


/** query root */
export type Query_RootMessages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootMessages_RecipientsArgs = {
  distinct_on: Maybe<Array<Messages_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Recipients_Order_By>>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_Recipients_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Recipients_Order_By>>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};


/** query root */
export type Query_RootMessages_Recipients_By_PkArgs = {
  id: Scalars['uuid'];
  message_id: Scalars['uuid'];
};


/** query root */
export type Query_RootNest_GetMewtwoByIdArgs = {
  id: Scalars['String'];
  locale: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
};


/** query root */
export type Query_RootNest_GetPollNameArgs = {
  code: Scalars['String'];
  id: Scalars['String'];
};


/** query root */
export type Query_RootPollsArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** query root */
export type Query_RootPolls_AggregateArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** query root */
export type Query_RootPolls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootRecipientsArgs = {
  distinct_on: Maybe<Array<Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Recipients_Order_By>>;
  where: Maybe<Recipients_Bool_Exp>;
};


/** query root */
export type Query_RootRecipients_AggregateArgs = {
  distinct_on: Maybe<Array<Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Recipients_Order_By>>;
  where: Maybe<Recipients_Bool_Exp>;
};


/** query root */
export type Query_RootRecipients_By_PkArgs = {
  comment_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
};


/** query root */
export type Query_RootRemindersArgs = {
  distinct_on: Maybe<Array<Reminders_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Reminders_Order_By>>;
  where: Maybe<Reminders_Bool_Exp>;
};


/** query root */
export type Query_RootReminders_AggregateArgs = {
  distinct_on: Maybe<Array<Reminders_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Reminders_Order_By>>;
  where: Maybe<Reminders_Bool_Exp>;
};


/** query root */
export type Query_RootReminders_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUpvotesArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** query root */
export type Query_RootUpvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** query root */
export type Query_RootUpvotes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Order_By>>;
  where: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsers_Followed_PollsArgs = {
  distinct_on: Maybe<Array<Users_Followed_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Followed_Polls_Order_By>>;
  where: Maybe<Users_Followed_Polls_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Followed_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Followed_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Followed_Polls_Order_By>>;
  where: Maybe<Users_Followed_Polls_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Followed_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsers_PollsArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootWebhooksArgs = {
  distinct_on: Maybe<Array<Webhooks_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Webhooks_Order_By>>;
  where: Maybe<Webhooks_Bool_Exp>;
};


/** query root */
export type Query_RootWebhooks_AggregateArgs = {
  distinct_on: Maybe<Array<Webhooks_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Webhooks_Order_By>>;
  where: Maybe<Webhooks_Bool_Exp>;
};


/** query root */
export type Query_RootWebhooks_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "recipients" */
export type Recipients = {
  __typename?: 'recipients';
  /** An object relationship */
  comment: Comments;
  comment_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "recipients" */
export type Recipients_Aggregate = {
  __typename?: 'recipients_aggregate';
  aggregate: Maybe<Recipients_Aggregate_Fields>;
  nodes: Array<Recipients>;
};

/** aggregate fields of "recipients" */
export type Recipients_Aggregate_Fields = {
  __typename?: 'recipients_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Recipients_Max_Fields>;
  min: Maybe<Recipients_Min_Fields>;
};


/** aggregate fields of "recipients" */
export type Recipients_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Recipients_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipients" */
export type Recipients_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Recipients_Max_Order_By>;
  min: Maybe<Recipients_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipients" */
export type Recipients_Arr_Rel_Insert_Input = {
  data: Array<Recipients_Insert_Input>;
  on_conflict: Maybe<Recipients_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipients". All fields are combined with a logical 'AND'. */
export type Recipients_Bool_Exp = {
  _and: Maybe<Array<Maybe<Recipients_Bool_Exp>>>;
  _not: Maybe<Recipients_Bool_Exp>;
  _or: Maybe<Array<Maybe<Recipients_Bool_Exp>>>;
  comment: Maybe<Comments_Bool_Exp>;
  comment_id: Maybe<Uuid_Comparison_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  read_at: Maybe<Timestamptz_Comparison_Exp>;
  received_at: Maybe<Timestamptz_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  user_id: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipients" */
export type Recipients_Constraint = 
  /** unique or primary key constraint */
  | 'recipient_pkey';

/** input type for inserting data into table "recipients" */
export type Recipients_Insert_Input = {
  comment: Maybe<Comments_Obj_Rel_Insert_Input>;
  comment_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Recipients_Max_Fields = {
  __typename?: 'recipients_max_fields';
  comment_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "recipients" */
export type Recipients_Max_Order_By = {
  comment_id: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Recipients_Min_Fields = {
  __typename?: 'recipients_min_fields';
  comment_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  read_at: Maybe<Scalars['timestamptz']>;
  received_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "recipients" */
export type Recipients_Min_Order_By = {
  comment_id: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "recipients" */
export type Recipients_Mutation_Response = {
  __typename?: 'recipients_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Recipients>;
};

/** input type for inserting object relation for remote table "recipients" */
export type Recipients_Obj_Rel_Insert_Input = {
  data: Recipients_Insert_Input;
  on_conflict: Maybe<Recipients_On_Conflict>;
};

/** on conflict condition type for table "recipients" */
export type Recipients_On_Conflict = {
  constraint: Recipients_Constraint;
  update_columns: Array<Recipients_Update_Column>;
  where: Maybe<Recipients_Bool_Exp>;
};

/** ordering options when selecting data from "recipients" */
export type Recipients_Order_By = {
  comment: Maybe<Comments_Order_By>;
  comment_id: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  read_at: Maybe<Order_By>;
  received_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "recipients" */
export type Recipients_Pk_Columns_Input = {
  comment_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
};

/** select columns of table "recipients" */
export type Recipients_Select_Column = 
  /** column name */
  | 'comment_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'read_at'
  /** column name */
  | 'received_at'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "recipients" */
export type Recipients_Set_Input = {
  read_at: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "recipients" */
export type Recipients_Update_Column = 
  /** column name */
  | 'read_at';

/** columns and relationships of "reminders" */
export type Reminders = {
  __typename?: 'reminders';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  send_at: Scalars['timestamptz'];
  send_to_group: Scalars['Boolean'];
  sent_at: Maybe<Scalars['timestamptz']>;
  started_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "reminders" */
export type Reminders_Aggregate = {
  __typename?: 'reminders_aggregate';
  aggregate: Maybe<Reminders_Aggregate_Fields>;
  nodes: Array<Reminders>;
};

/** aggregate fields of "reminders" */
export type Reminders_Aggregate_Fields = {
  __typename?: 'reminders_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Reminders_Max_Fields>;
  min: Maybe<Reminders_Min_Fields>;
};


/** aggregate fields of "reminders" */
export type Reminders_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Reminders_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "reminders" */
export type Reminders_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Reminders_Max_Order_By>;
  min: Maybe<Reminders_Min_Order_By>;
};

/** input type for inserting array relation for remote table "reminders" */
export type Reminders_Arr_Rel_Insert_Input = {
  data: Array<Reminders_Insert_Input>;
};

/** Boolean expression to filter rows from the table "reminders". All fields are combined with a logical 'AND'. */
export type Reminders_Bool_Exp = {
  _and: Maybe<Array<Maybe<Reminders_Bool_Exp>>>;
  _not: Maybe<Reminders_Bool_Exp>;
  _or: Maybe<Array<Maybe<Reminders_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  created_by: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  send_at: Maybe<Timestamptz_Comparison_Exp>;
  send_to_group: Maybe<Boolean_Comparison_Exp>;
  sent_at: Maybe<Timestamptz_Comparison_Exp>;
  started_at: Maybe<Timestamptz_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** input type for inserting data into table "reminders" */
export type Reminders_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
  poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  poll_id: Maybe<Scalars['uuid']>;
  send_at: Maybe<Scalars['timestamptz']>;
  send_to_group: Maybe<Scalars['Boolean']>;
  sent_at: Maybe<Scalars['timestamptz']>;
  started_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Reminders_Max_Fields = {
  __typename?: 'reminders_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  send_at: Maybe<Scalars['timestamptz']>;
  sent_at: Maybe<Scalars['timestamptz']>;
  started_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "reminders" */
export type Reminders_Max_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  send_at: Maybe<Order_By>;
  sent_at: Maybe<Order_By>;
  started_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Reminders_Min_Fields = {
  __typename?: 'reminders_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  send_at: Maybe<Scalars['timestamptz']>;
  sent_at: Maybe<Scalars['timestamptz']>;
  started_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "reminders" */
export type Reminders_Min_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  send_at: Maybe<Order_By>;
  sent_at: Maybe<Order_By>;
  started_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
};

/** response of any mutation on the table "reminders" */
export type Reminders_Mutation_Response = {
  __typename?: 'reminders_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Reminders>;
};

/** input type for inserting object relation for remote table "reminders" */
export type Reminders_Obj_Rel_Insert_Input = {
  data: Reminders_Insert_Input;
};

/** ordering options when selecting data from "reminders" */
export type Reminders_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  send_at: Maybe<Order_By>;
  send_to_group: Maybe<Order_By>;
  sent_at: Maybe<Order_By>;
  started_at: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "reminders" */
export type Reminders_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "reminders" */
export type Reminders_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'send_at'
  /** column name */
  | 'send_to_group'
  /** column name */
  | 'sent_at'
  /** column name */
  | 'started_at'
  /** column name */
  | 'updated_at';

/** input type for inserting array relation for remote table "reported_links" */
export type Reported_Links_Arr_Rel_Insert_Input = {
  data: Array<Reported_Links_Insert_Input>;
};

/** input type for inserting data into table "reported_links" */
export type Reported_Links_Insert_Input = {
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
  reason: Maybe<Scalars['String']>;
  reported_by: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "reported_links" */
export type Reported_Links_Mutation_Response = {
  __typename?: 'reported_links_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
};

/** input type for inserting object relation for remote table "reported_links" */
export type Reported_Links_Obj_Rel_Insert_Input = {
  data: Reported_Links_Insert_Input;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "blocked_users" */
  blocked_users: Array<Blocked_Users>;
  /** fetch aggregated fields from the table: "blocked_users" */
  blocked_users_aggregate: Blocked_Users_Aggregate;
  /** fetch data from the table: "blocked_users" using primary key columns */
  blocked_users_by_pk: Maybe<Blocked_Users>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments_attachments" */
  comments_attachments: Array<Comments_Attachments>;
  /** fetch aggregated fields from the table: "comments_attachments" */
  comments_attachments_aggregate: Comments_Attachments_Aggregate;
  /** fetch data from the table: "comments_attachments" using primary key columns */
  comments_attachments_by_pk: Maybe<Comments_Attachments>;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk: Maybe<Comments>;
  /** fetch data from the table: "downvotes" */
  downvotes: Array<Downvotes>;
  /** fetch aggregated fields from the table: "downvotes" */
  downvotes_aggregate: Downvotes_Aggregate;
  /** fetch data from the table: "downvotes" using primary key columns */
  downvotes_by_pk: Maybe<Downvotes>;
  /** execute function "get_messages_and_links" which returns "messages_and_links" */
  get_messages_and_links: Array<Messages_And_Links>;
  /** execute function "get_messages_and_links" and query aggregates on result of table type "messages_and_links" */
  get_messages_and_links_aggregate: Messages_And_Links_Aggregate;
  /** fetch data from the table: "links" */
  links: Array<Links>;
  /** fetch aggregated fields from the table: "links" */
  links_aggregate: Links_Aggregate;
  /** fetch data from the table: "links_attachments" */
  links_attachments: Array<Links_Attachments>;
  /** fetch aggregated fields from the table: "links_attachments" */
  links_attachments_aggregate: Links_Attachments_Aggregate;
  /** fetch data from the table: "links_attachments" using primary key columns */
  links_attachments_by_pk: Maybe<Links_Attachments>;
  /** fetch data from the table: "links" using primary key columns */
  links_by_pk: Maybe<Links>;
  /** fetch data from the table: "links_polls" */
  links_polls: Array<Links_Polls>;
  /** fetch aggregated fields from the table: "links_polls" */
  links_polls_aggregate: Links_Polls_Aggregate;
  /** fetch data from the table: "links_polls" using primary key columns */
  links_polls_by_pk: Maybe<Links_Polls>;
  /** fetch data from the table: "links_recipients" */
  links_recipients: Array<Links_Recipients>;
  /** fetch aggregated fields from the table: "links_recipients" */
  links_recipients_aggregate: Links_Recipients_Aggregate;
  /** fetch data from the table: "links_recipients" using primary key columns */
  links_recipients_by_pk: Maybe<Links_Recipients>;
  /** fetch data from the table: "messages" */
  messages: Array<Messages>;
  /** fetch aggregated fields from the table: "messages" */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages_and_links" */
  messages_and_links: Array<Messages_And_Links>;
  /** fetch aggregated fields from the table: "messages_and_links" */
  messages_and_links_aggregate: Messages_And_Links_Aggregate;
  /** fetch data from the table: "messages_and_links" using primary key columns */
  messages_and_links_by_pk: Maybe<Messages_And_Links>;
  /** fetch data from the table: "messages_attachments" */
  messages_attachments: Array<Messages_Attachments>;
  /** fetch aggregated fields from the table: "messages_attachments" */
  messages_attachments_aggregate: Messages_Attachments_Aggregate;
  /** fetch data from the table: "messages_attachments" using primary key columns */
  messages_attachments_by_pk: Maybe<Messages_Attachments>;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk: Maybe<Messages>;
  /** fetch data from the table: "messages_recipients" */
  messages_recipients: Array<Messages_Recipients>;
  /** fetch aggregated fields from the table: "messages_recipients" */
  messages_recipients_aggregate: Messages_Recipients_Aggregate;
  /** fetch data from the table: "messages_recipients" using primary key columns */
  messages_recipients_by_pk: Maybe<Messages_Recipients>;
  /** fetch data from the table: "polls" */
  polls: Array<Polls>;
  /** fetch aggregated fields from the table: "polls" */
  polls_aggregate: Polls_Aggregate;
  /** fetch data from the table: "polls" using primary key columns */
  polls_by_pk: Maybe<Polls>;
  /** fetch data from the table: "recipients" */
  recipients: Array<Recipients>;
  /** fetch aggregated fields from the table: "recipients" */
  recipients_aggregate: Recipients_Aggregate;
  /** fetch data from the table: "recipients" using primary key columns */
  recipients_by_pk: Maybe<Recipients>;
  /** fetch data from the table: "reminders" */
  reminders: Array<Reminders>;
  /** fetch aggregated fields from the table: "reminders" */
  reminders_aggregate: Reminders_Aggregate;
  /** fetch data from the table: "reminders" using primary key columns */
  reminders_by_pk: Maybe<Reminders>;
  /** fetch data from the table: "upvotes" */
  upvotes: Array<Upvotes>;
  /** fetch aggregated fields from the table: "upvotes" */
  upvotes_aggregate: Upvotes_Aggregate;
  /** fetch data from the table: "upvotes" using primary key columns */
  upvotes_by_pk: Maybe<Upvotes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
  /** fetch data from the table: "users_followed_polls" */
  users_followed_polls: Array<Users_Followed_Polls>;
  /** fetch aggregated fields from the table: "users_followed_polls" */
  users_followed_polls_aggregate: Users_Followed_Polls_Aggregate;
  /** fetch data from the table: "users_followed_polls" using primary key columns */
  users_followed_polls_by_pk: Maybe<Users_Followed_Polls>;
  /** fetch data from the table: "users_polls" */
  users_polls: Array<Users_Polls>;
  /** fetch aggregated fields from the table: "users_polls" */
  users_polls_aggregate: Users_Polls_Aggregate;
  /** fetch data from the table: "users_polls" using primary key columns */
  users_polls_by_pk: Maybe<Users_Polls>;
  /** fetch data from the table: "webhooks" */
  webhooks: Array<Webhooks>;
  /** fetch aggregated fields from the table: "webhooks" */
  webhooks_aggregate: Webhooks_Aggregate;
  /** fetch data from the table: "webhooks" using primary key columns */
  webhooks_by_pk: Maybe<Webhooks>;
};


/** subscription root */
export type Subscription_RootBlocked_UsersArgs = {
  distinct_on: Maybe<Array<Blocked_Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Blocked_Users_Order_By>>;
  where: Maybe<Blocked_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBlocked_Users_AggregateArgs = {
  distinct_on: Maybe<Array<Blocked_Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Blocked_Users_Order_By>>;
  where: Maybe<Blocked_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBlocked_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootCommentsArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootComments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootComments_AttachmentsArgs = {
  distinct_on: Maybe<Array<Comments_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Attachments_Order_By>>;
  where: Maybe<Comments_Attachments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootComments_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Attachments_Order_By>>;
  where: Maybe<Comments_Attachments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootComments_Attachments_By_PkArgs = {
  comment_id: Scalars['uuid'];
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootComments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootDownvotesArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDownvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDownvotes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootGet_Messages_And_LinksArgs = {
  args: Get_Messages_And_Links_Args;
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGet_Messages_And_Links_AggregateArgs = {
  args: Get_Messages_And_Links_Args;
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinksArgs = {
  distinct_on: Maybe<Array<Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Order_By>>;
  where: Maybe<Links_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Order_By>>;
  where: Maybe<Links_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_AttachmentsArgs = {
  distinct_on: Maybe<Array<Links_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Attachments_Order_By>>;
  where: Maybe<Links_Attachments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Attachments_Order_By>>;
  where: Maybe<Links_Attachments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_Attachments_By_PkArgs = {
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  link_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootLinks_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootLinks_PollsArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Polls_Order_By>>;
  where: Maybe<Links_Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootLinks_RecipientsArgs = {
  distinct_on: Maybe<Array<Links_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Recipients_Order_By>>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_Recipients_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Recipients_Order_By>>;
  where: Maybe<Links_Recipients_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLinks_Recipients_By_PkArgs = {
  id: Scalars['uuid'];
  link_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMessagesArgs = {
  distinct_on: Maybe<Array<Messages_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Order_By>>;
  where: Maybe<Messages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Order_By>>;
  where: Maybe<Messages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_And_LinksArgs = {
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_And_Links_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_And_Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_And_Links_Order_By>>;
  where: Maybe<Messages_And_Links_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_And_Links_By_PkArgs = {
  link_id: Scalars['uuid'];
  message_id: Scalars['uuid'];
  poll_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMessages_AttachmentsArgs = {
  distinct_on: Maybe<Array<Messages_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Attachments_Order_By>>;
  where: Maybe<Messages_Attachments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_Attachments_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Attachments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Attachments_Order_By>>;
  where: Maybe<Messages_Attachments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_Attachments_By_PkArgs = {
  file_id: Scalars['uuid'];
  id: Scalars['uuid'];
  message_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMessages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMessages_RecipientsArgs = {
  distinct_on: Maybe<Array<Messages_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Recipients_Order_By>>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_Recipients_AggregateArgs = {
  distinct_on: Maybe<Array<Messages_Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Messages_Recipients_Order_By>>;
  where: Maybe<Messages_Recipients_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessages_Recipients_By_PkArgs = {
  id: Scalars['uuid'];
  message_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPollsArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPolls_AggregateArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPolls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootRecipientsArgs = {
  distinct_on: Maybe<Array<Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Recipients_Order_By>>;
  where: Maybe<Recipients_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecipients_AggregateArgs = {
  distinct_on: Maybe<Array<Recipients_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Recipients_Order_By>>;
  where: Maybe<Recipients_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRecipients_By_PkArgs = {
  comment_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootRemindersArgs = {
  distinct_on: Maybe<Array<Reminders_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Reminders_Order_By>>;
  where: Maybe<Reminders_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootReminders_AggregateArgs = {
  distinct_on: Maybe<Array<Reminders_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Reminders_Order_By>>;
  where: Maybe<Reminders_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootReminders_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUpvotesArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUpvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUpvotes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Order_By>>;
  where: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsers_Followed_PollsArgs = {
  distinct_on: Maybe<Array<Users_Followed_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Followed_Polls_Order_By>>;
  where: Maybe<Users_Followed_Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Followed_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Followed_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Followed_Polls_Order_By>>;
  where: Maybe<Users_Followed_Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Followed_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsers_PollsArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_Polls_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootWebhooksArgs = {
  distinct_on: Maybe<Array<Webhooks_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Webhooks_Order_By>>;
  where: Maybe<Webhooks_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWebhooks_AggregateArgs = {
  distinct_on: Maybe<Array<Webhooks_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Webhooks_Order_By>>;
  where: Maybe<Webhooks_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWebhooks_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq: Maybe<Scalars['timestamptz']>;
  _gt: Maybe<Scalars['timestamptz']>;
  _gte: Maybe<Scalars['timestamptz']>;
  _in: Maybe<Array<Scalars['timestamptz']>>;
  _is_null: Maybe<Scalars['Boolean']>;
  _lt: Maybe<Scalars['timestamptz']>;
  _lte: Maybe<Scalars['timestamptz']>;
  _neq: Maybe<Scalars['timestamptz']>;
  _nin: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "upvotes" */
export type Upvotes = {
  __typename?: 'upvotes';
  created_at: Scalars['timestamptz'];
  created_by: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  link: Links;
  link_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "upvotes" */
export type Upvotes_Aggregate = {
  __typename?: 'upvotes_aggregate';
  aggregate: Maybe<Upvotes_Aggregate_Fields>;
  nodes: Array<Upvotes>;
};

/** aggregate fields of "upvotes" */
export type Upvotes_Aggregate_Fields = {
  __typename?: 'upvotes_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Upvotes_Max_Fields>;
  min: Maybe<Upvotes_Min_Fields>;
};


/** aggregate fields of "upvotes" */
export type Upvotes_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Upvotes_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "upvotes" */
export type Upvotes_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Upvotes_Max_Order_By>;
  min: Maybe<Upvotes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "upvotes" */
export type Upvotes_Arr_Rel_Insert_Input = {
  data: Array<Upvotes_Insert_Input>;
};

/** Boolean expression to filter rows from the table "upvotes". All fields are combined with a logical 'AND'. */
export type Upvotes_Bool_Exp = {
  _and: Maybe<Array<Maybe<Upvotes_Bool_Exp>>>;
  _not: Maybe<Upvotes_Bool_Exp>;
  _or: Maybe<Array<Maybe<Upvotes_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  created_by: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  link: Maybe<Links_Bool_Exp>;
  link_id: Maybe<Uuid_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** input type for inserting data into table "upvotes" */
export type Upvotes_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link: Maybe<Links_Obj_Rel_Insert_Input>;
  link_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Upvotes_Max_Fields = {
  __typename?: 'upvotes_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "upvotes" */
export type Upvotes_Max_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Upvotes_Min_Fields = {
  __typename?: 'upvotes_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  link_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "upvotes" */
export type Upvotes_Min_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link_id: Maybe<Order_By>;
};

/** response of any mutation on the table "upvotes" */
export type Upvotes_Mutation_Response = {
  __typename?: 'upvotes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Upvotes>;
};

/** input type for inserting object relation for remote table "upvotes" */
export type Upvotes_Obj_Rel_Insert_Input = {
  data: Upvotes_Insert_Input;
};

/** ordering options when selecting data from "upvotes" */
export type Upvotes_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  link: Maybe<Links_Order_By>;
  link_id: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "upvotes" */
export type Upvotes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "upvotes" */
export type Upvotes_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'id'
  /** column name */
  | 'link_id';

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  blocked_users: Array<Blocked_Users>;
  /** An aggregated array relationship */
  blocked_users_aggregate: Blocked_Users_Aggregate;
  color: Maybe<Scalars['String']>;
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregated array relationship */
  comments_aggregate: Comments_Aggregate;
  device_push_token: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  downvotes: Array<Downvotes>;
  /** An aggregated array relationship */
  downvotes_aggregate: Downvotes_Aggregate;
  email: Scalars['String'];
  expo_push_token: Maybe<Scalars['String']>;
  first_name: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  last_name: Maybe<Scalars['String']>;
  last_seen_at: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  links: Array<Links>;
  /** An aggregated array relationship */
  links_aggregate: Links_Aggregate;
  locale: Maybe<Scalars['String']>;
  online_ping: Maybe<Scalars['Boolean']>;
  picture: Maybe<Scalars['String']>;
  /** An array relationship */
  polls: Array<Polls>;
  /** An aggregated array relationship */
  polls_aggregate: Polls_Aggregate;
  premium: Scalars['Boolean'];
  /** An array relationship */
  reminders: Array<Reminders>;
  /** An aggregated array relationship */
  reminders_aggregate: Reminders_Aggregate;
  /** An array relationship */
  upvotes: Array<Upvotes>;
  /** An aggregated array relationship */
  upvotes_aggregate: Upvotes_Aggregate;
  username: Maybe<Scalars['String']>;
  /** An array relationship */
  users_polls: Array<Users_Polls>;
  /** An aggregated array relationship */
  users_polls_aggregate: Users_Polls_Aggregate;
};


/** columns and relationships of "users" */
export type UsersBlocked_UsersArgs = {
  distinct_on: Maybe<Array<Blocked_Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Blocked_Users_Order_By>>;
  where: Maybe<Blocked_Users_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersBlocked_Users_AggregateArgs = {
  distinct_on: Maybe<Array<Blocked_Users_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Blocked_Users_Order_By>>;
  where: Maybe<Blocked_Users_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCommentsArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersComments_AggregateArgs = {
  distinct_on: Maybe<Array<Comments_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Comments_Order_By>>;
  where: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersDevice_Push_TokenArgs = {
  path: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersDownvotesArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersDownvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Downvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Downvotes_Order_By>>;
  where: Maybe<Downvotes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersLinksArgs = {
  distinct_on: Maybe<Array<Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Order_By>>;
  where: Maybe<Links_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersLinks_AggregateArgs = {
  distinct_on: Maybe<Array<Links_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Links_Order_By>>;
  where: Maybe<Links_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPollsArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPolls_AggregateArgs = {
  distinct_on: Maybe<Array<Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Polls_Order_By>>;
  where: Maybe<Polls_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRemindersArgs = {
  distinct_on: Maybe<Array<Reminders_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Reminders_Order_By>>;
  where: Maybe<Reminders_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersReminders_AggregateArgs = {
  distinct_on: Maybe<Array<Reminders_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Reminders_Order_By>>;
  where: Maybe<Reminders_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUpvotesArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUpvotes_AggregateArgs = {
  distinct_on: Maybe<Array<Upvotes_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Upvotes_Order_By>>;
  where: Maybe<Upvotes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUsers_PollsArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUsers_Polls_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Polls_Select_Column>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  order_by: Maybe<Array<Users_Polls_Order_By>>;
  where: Maybe<Users_Polls_Bool_Exp>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  device_push_token: Maybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not: Maybe<Users_Bool_Exp>;
  _or: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  blocked_users: Maybe<Blocked_Users_Bool_Exp>;
  color: Maybe<String_Comparison_Exp>;
  comments: Maybe<Comments_Bool_Exp>;
  device_push_token: Maybe<Jsonb_Comparison_Exp>;
  downvotes: Maybe<Downvotes_Bool_Exp>;
  email: Maybe<String_Comparison_Exp>;
  expo_push_token: Maybe<String_Comparison_Exp>;
  first_name: Maybe<String_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  last_name: Maybe<String_Comparison_Exp>;
  last_seen_at: Maybe<Timestamptz_Comparison_Exp>;
  links: Maybe<Links_Bool_Exp>;
  locale: Maybe<String_Comparison_Exp>;
  online_ping: Maybe<Boolean_Comparison_Exp>;
  picture: Maybe<String_Comparison_Exp>;
  polls: Maybe<Polls_Bool_Exp>;
  premium: Maybe<Boolean_Comparison_Exp>;
  reminders: Maybe<Reminders_Bool_Exp>;
  upvotes: Maybe<Upvotes_Bool_Exp>;
  username: Maybe<String_Comparison_Exp>;
  users_polls: Maybe<Users_Polls_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export type Users_Constraint = 
  /** unique or primary key constraint */
  | 'user_email_key'
  /** unique or primary key constraint */
  | 'users_id_key'
  /** unique or primary key constraint */
  | 'users_pkey';

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  device_push_token: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  device_push_token: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  device_push_token: Maybe<Scalars['String']>;
};

/** columns and relationships of "users_followed_polls" */
export type Users_Followed_Polls = {
  __typename?: 'users_followed_polls';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "users_followed_polls" */
export type Users_Followed_Polls_Aggregate = {
  __typename?: 'users_followed_polls_aggregate';
  aggregate: Maybe<Users_Followed_Polls_Aggregate_Fields>;
  nodes: Array<Users_Followed_Polls>;
};

/** aggregate fields of "users_followed_polls" */
export type Users_Followed_Polls_Aggregate_Fields = {
  __typename?: 'users_followed_polls_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Users_Followed_Polls_Max_Fields>;
  min: Maybe<Users_Followed_Polls_Min_Fields>;
};


/** aggregate fields of "users_followed_polls" */
export type Users_Followed_Polls_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Users_Followed_Polls_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users_followed_polls" */
export type Users_Followed_Polls_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Users_Followed_Polls_Max_Order_By>;
  min: Maybe<Users_Followed_Polls_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users_followed_polls" */
export type Users_Followed_Polls_Arr_Rel_Insert_Input = {
  data: Array<Users_Followed_Polls_Insert_Input>;
};

/** Boolean expression to filter rows from the table "users_followed_polls". All fields are combined with a logical 'AND'. */
export type Users_Followed_Polls_Bool_Exp = {
  _and: Maybe<Array<Maybe<Users_Followed_Polls_Bool_Exp>>>;
  _not: Maybe<Users_Followed_Polls_Bool_Exp>;
  _or: Maybe<Array<Maybe<Users_Followed_Polls_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  user_id: Maybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "users_followed_polls" */
export type Users_Followed_Polls_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Users_Followed_Polls_Max_Fields = {
  __typename?: 'users_followed_polls_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "users_followed_polls" */
export type Users_Followed_Polls_Max_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Followed_Polls_Min_Fields = {
  __typename?: 'users_followed_polls_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "users_followed_polls" */
export type Users_Followed_Polls_Min_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "users_followed_polls" */
export type Users_Followed_Polls_Mutation_Response = {
  __typename?: 'users_followed_polls_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users_Followed_Polls>;
};

/** input type for inserting object relation for remote table "users_followed_polls" */
export type Users_Followed_Polls_Obj_Rel_Insert_Input = {
  data: Users_Followed_Polls_Insert_Input;
};

/** ordering options when selecting data from "users_followed_polls" */
export type Users_Followed_Polls_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "users_followed_polls" */
export type Users_Followed_Polls_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users_followed_polls" */
export type Users_Followed_Polls_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  blocked_users_aggregate: Maybe<Blocked_Users_Aggregate_Order_By>;
  color: Maybe<Order_By>;
  comments_aggregate: Maybe<Comments_Aggregate_Order_By>;
  device_push_token: Maybe<Order_By>;
  downvotes_aggregate: Maybe<Downvotes_Aggregate_Order_By>;
  email: Maybe<Order_By>;
  expo_push_token: Maybe<Order_By>;
  first_name: Maybe<Order_By>;
  id: Maybe<Order_By>;
  last_name: Maybe<Order_By>;
  last_seen_at: Maybe<Order_By>;
  links_aggregate: Maybe<Links_Aggregate_Order_By>;
  locale: Maybe<Order_By>;
  online_ping: Maybe<Order_By>;
  picture: Maybe<Order_By>;
  polls_aggregate: Maybe<Polls_Aggregate_Order_By>;
  premium: Maybe<Order_By>;
  reminders_aggregate: Maybe<Reminders_Aggregate_Order_By>;
  upvotes_aggregate: Maybe<Upvotes_Aggregate_Order_By>;
  username: Maybe<Order_By>;
  users_polls_aggregate: Maybe<Users_Polls_Aggregate_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "users_polls" */
export type Users_Polls = {
  __typename?: 'users_polls';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "users_polls" */
export type Users_Polls_Aggregate = {
  __typename?: 'users_polls_aggregate';
  aggregate: Maybe<Users_Polls_Aggregate_Fields>;
  nodes: Array<Users_Polls>;
};

/** aggregate fields of "users_polls" */
export type Users_Polls_Aggregate_Fields = {
  __typename?: 'users_polls_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Users_Polls_Max_Fields>;
  min: Maybe<Users_Polls_Min_Fields>;
};


/** aggregate fields of "users_polls" */
export type Users_Polls_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Users_Polls_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users_polls" */
export type Users_Polls_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Users_Polls_Max_Order_By>;
  min: Maybe<Users_Polls_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users_polls" */
export type Users_Polls_Arr_Rel_Insert_Input = {
  data: Array<Users_Polls_Insert_Input>;
};

/** Boolean expression to filter rows from the table "users_polls". All fields are combined with a logical 'AND'. */
export type Users_Polls_Bool_Exp = {
  _and: Maybe<Array<Maybe<Users_Polls_Bool_Exp>>>;
  _not: Maybe<Users_Polls_Bool_Exp>;
  _or: Maybe<Array<Maybe<Users_Polls_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  user_id: Maybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "users_polls" */
export type Users_Polls_Insert_Input = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Users_Polls_Max_Fields = {
  __typename?: 'users_polls_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "users_polls" */
export type Users_Polls_Max_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Polls_Min_Fields = {
  __typename?: 'users_polls_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "users_polls" */
export type Users_Polls_Min_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "users_polls" */
export type Users_Polls_Mutation_Response = {
  __typename?: 'users_polls_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users_Polls>;
};

/** input type for inserting object relation for remote table "users_polls" */
export type Users_Polls_Obj_Rel_Insert_Input = {
  data: Users_Polls_Insert_Input;
};

/** ordering options when selecting data from "users_polls" */
export type Users_Polls_Order_By = {
  created_at: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "users_polls" */
export type Users_Polls_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users_polls" */
export type Users_Polls_Select_Column = 
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  device_push_token: Maybe<Scalars['jsonb']>;
};

/** select columns of table "users" */
export type Users_Select_Column = 
  /** column name */
  | 'color'
  /** column name */
  | 'device_push_token'
  /** column name */
  | 'email'
  /** column name */
  | 'expo_push_token'
  /** column name */
  | 'first_name'
  /** column name */
  | 'id'
  /** column name */
  | 'last_name'
  /** column name */
  | 'last_seen_at'
  /** column name */
  | 'locale'
  /** column name */
  | 'online_ping'
  /** column name */
  | 'picture'
  /** column name */
  | 'premium'
  /** column name */
  | 'username';

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  birthdate: Maybe<Scalars['date']>;
  color: Maybe<Scalars['String']>;
  device_push_token: Maybe<Scalars['jsonb']>;
  email: Maybe<Scalars['String']>;
  expo_push_token: Maybe<Scalars['String']>;
  first_name: Maybe<Scalars['String']>;
  last_name: Maybe<Scalars['String']>;
  last_seen_at: Maybe<Scalars['timestamptz']>;
  locale: Maybe<Scalars['String']>;
  online_ping: Maybe<Scalars['Boolean']>;
  password: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  picture: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  username: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export type Users_Update_Column = 
  /** column name */
  | 'birthdate'
  /** column name */
  | 'color'
  /** column name */
  | 'device_push_token'
  /** column name */
  | 'email'
  /** column name */
  | 'expo_push_token'
  /** column name */
  | 'first_name'
  /** column name */
  | 'last_name'
  /** column name */
  | 'last_seen_at'
  /** column name */
  | 'locale'
  /** column name */
  | 'online_ping'
  /** column name */
  | 'password'
  /** column name */
  | 'phone'
  /** column name */
  | 'picture'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'username';


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq: Maybe<Scalars['uuid']>;
  _gt: Maybe<Scalars['uuid']>;
  _gte: Maybe<Scalars['uuid']>;
  _in: Maybe<Array<Scalars['uuid']>>;
  _is_null: Maybe<Scalars['Boolean']>;
  _lt: Maybe<Scalars['uuid']>;
  _lte: Maybe<Scalars['uuid']>;
  _neq: Maybe<Scalars['uuid']>;
  _nin: Maybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "webhooks" */
export type Webhooks = {
  __typename?: 'webhooks';
  active: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  created_by: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  poll: Polls;
  poll_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  url: Scalars['String'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "webhooks" */
export type Webhooks_Aggregate = {
  __typename?: 'webhooks_aggregate';
  aggregate: Maybe<Webhooks_Aggregate_Fields>;
  nodes: Array<Webhooks>;
};

/** aggregate fields of "webhooks" */
export type Webhooks_Aggregate_Fields = {
  __typename?: 'webhooks_aggregate_fields';
  count: Maybe<Scalars['Int']>;
  max: Maybe<Webhooks_Max_Fields>;
  min: Maybe<Webhooks_Min_Fields>;
};


/** aggregate fields of "webhooks" */
export type Webhooks_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Webhooks_Select_Column>>;
  distinct: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "webhooks" */
export type Webhooks_Aggregate_Order_By = {
  count: Maybe<Order_By>;
  max: Maybe<Webhooks_Max_Order_By>;
  min: Maybe<Webhooks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "webhooks" */
export type Webhooks_Arr_Rel_Insert_Input = {
  data: Array<Webhooks_Insert_Input>;
  on_conflict: Maybe<Webhooks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "webhooks". All fields are combined with a logical 'AND'. */
export type Webhooks_Bool_Exp = {
  _and: Maybe<Array<Maybe<Webhooks_Bool_Exp>>>;
  _not: Maybe<Webhooks_Bool_Exp>;
  _or: Maybe<Array<Maybe<Webhooks_Bool_Exp>>>;
  active: Maybe<Boolean_Comparison_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  created_by: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Uuid_Comparison_Exp>;
  poll: Maybe<Polls_Bool_Exp>;
  poll_id: Maybe<Uuid_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  url: Maybe<String_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "webhooks" */
export type Webhooks_Constraint = 
  /** unique or primary key constraint */
  | 'webhooks_pkey';

/** input type for inserting data into table "webhooks" */
export type Webhooks_Insert_Input = {
  active: Maybe<Scalars['Boolean']>;
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  poll: Maybe<Polls_Obj_Rel_Insert_Input>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Webhooks_Max_Fields = {
  __typename?: 'webhooks_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "webhooks" */
export type Webhooks_Max_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Webhooks_Min_Fields = {
  __typename?: 'webhooks_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  poll_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  url: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "webhooks" */
export type Webhooks_Min_Order_By = {
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
};

/** response of any mutation on the table "webhooks" */
export type Webhooks_Mutation_Response = {
  __typename?: 'webhooks_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Webhooks>;
};

/** input type for inserting object relation for remote table "webhooks" */
export type Webhooks_Obj_Rel_Insert_Input = {
  data: Webhooks_Insert_Input;
  on_conflict: Maybe<Webhooks_On_Conflict>;
};

/** on conflict condition type for table "webhooks" */
export type Webhooks_On_Conflict = {
  constraint: Webhooks_Constraint;
  update_columns: Array<Webhooks_Update_Column>;
  where: Maybe<Webhooks_Bool_Exp>;
};

/** ordering options when selecting data from "webhooks" */
export type Webhooks_Order_By = {
  active: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  created_by: Maybe<Order_By>;
  id: Maybe<Order_By>;
  poll: Maybe<Polls_Order_By>;
  poll_id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  url: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "webhooks" */
export type Webhooks_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "webhooks" */
export type Webhooks_Select_Column = 
  /** column name */
  | 'active'
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'id'
  /** column name */
  | 'poll_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'url';

/** input type for updating data in table "webhooks" */
export type Webhooks_Set_Input = {
  active: Maybe<Scalars['Boolean']>;
  url: Maybe<Scalars['String']>;
};

/** update columns of table "webhooks" */
export type Webhooks_Update_Column = 
  /** column name */
  | 'active'
  /** column name */
  | 'url';

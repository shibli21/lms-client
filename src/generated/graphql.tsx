import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  bookItem: BookItem;
  bookItems: Array<BookItem>;
  paginatedBookItems: PaginatedBookItems;
  authors: Array<Author>;
  books: Array<Book>;
  checkedOutBooks: Array<CheckedOutBooks>;
  issuedBookForCurrentUser: Array<IssuedBookForCurrentUser>;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryBookItemArgs = {
  id: Scalars['Int'];
};


export type QueryPaginatedBookItemsArgs = {
  input?: Maybe<SearchBooksInput>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type BookItem = {
  __typename?: 'BookItem';
  id: Scalars['Float'];
  title: Scalars['String'];
  author: Author;
  edition: Scalars['String'];
  category: Scalars['String'];
  numberOfCopies: Scalars['Int'];
  books: Array<Book>;
  publicationDate: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['Float'];
  authorName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  books?: Maybe<Array<BookItem>>;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['Float'];
  isbnNumber: Scalars['Float'];
  rackNumber: Scalars['String'];
  status: Scalars['Boolean'];
  bookItem: BookItem;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedBookItems = {
  __typename?: 'PaginatedBookItems';
  bookItems: Array<BookItem>;
  hasMore: Scalars['Boolean'];
};

export type SearchBooksInput = {
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
};

export type CheckedOutBooks = {
  __typename?: 'CheckedOutBooks';
  id: Scalars['Float'];
  issuedBy: User;
  issuedBook: Book;
  createdAt: Scalars['String'];
  returnDate: Scalars['DateTime'];
  returnedDate?: Maybe<Scalars['DateTime']>;
  fine: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  studentId: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Boolean'];
  isLibrarian: Scalars['Boolean'];
  numberOfBooksCheckedOut: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type IssuedBookForCurrentUser = {
  __typename?: 'IssuedBookForCurrentUser';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  returnDate: Scalars['DateTime'];
  returnedDate?: Maybe<Scalars['DateTime']>;
  fine: Scalars['Int'];
  title: Scalars['String'];
  isbnNumber: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookItem: BookItem;
  addAuthorToLibrary: Author;
  addCopiesOfBookToLibrary: AddCopiesOfBookToLibraryResponse;
  issueBook: IssueBookResponse;
  renewBook: IssueBookResponse;
  returnBook: IssueBookResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddBookItemArgs = {
  bookItemInput: BookItemInputType;
};


export type MutationAddAuthorToLibraryArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddCopiesOfBookToLibraryArgs = {
  bookInput: BookInputType;
};


export type MutationIssueBookArgs = {
  bookISBN: Scalars['Int'];
};


export type MutationRenewBookArgs = {
  days: Scalars['Int'];
  ISBNNumber: Scalars['Int'];
};


export type MutationReturnBookArgs = {
  bookISBN: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UserInputType;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type BookItemInputType = {
  title: Scalars['String'];
  authorId: Scalars['Int'];
  category: Scalars['String'];
  edition: Scalars['String'];
};

export type AddCopiesOfBookToLibraryResponse = {
  __typename?: 'AddCopiesOfBookToLibraryResponse';
  errors?: Maybe<Array<FieldError>>;
  book?: Maybe<Book>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type BookInputType = {
  isbnNumber: Scalars['Float'];
  rackNumber: Scalars['String'];
  bookItemId: Scalars['Int'];
};

export type IssueBookResponse = {
  __typename?: 'IssueBookResponse';
  errors?: Maybe<Array<FieldError>>;
  checkOutBook?: Maybe<CheckedOutBooks>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserInputType = {
  studentId: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddBookItemMutationVariables = Exact<{
  addBookItem: BookItemInputType;
}>;


export type AddBookItemMutation = (
  { __typename?: 'Mutation' }
  & { addBookItem: (
    { __typename?: 'BookItem' }
    & Pick<BookItem, 'id' | 'title' | 'edition' | 'category' | 'numberOfCopies' | 'publicationDate' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'authorName' | 'description'>
    ) }
  ) }
);

export type AddCopiesOfBookToLibraryMutationVariables = Exact<{
  bookInput: BookInputType;
}>;


export type AddCopiesOfBookToLibraryMutation = (
  { __typename?: 'Mutation' }
  & { addCopiesOfBookToLibrary: (
    { __typename?: 'AddCopiesOfBookToLibraryResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, book?: Maybe<(
      { __typename?: 'Book' }
      & Pick<Book, 'id' | 'isbnNumber' | 'rackNumber' | 'status' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type IssueBookMutationVariables = Exact<{
  bookISBN: Scalars['Int'];
}>;


export type IssueBookMutation = (
  { __typename?: 'Mutation' }
  & { issueBook: (
    { __typename?: 'IssueBookResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, checkOutBook?: Maybe<(
      { __typename?: 'CheckedOutBooks' }
      & Pick<CheckedOutBooks, 'id' | 'createdAt' | 'returnDate' | 'returnedDate' | 'fine'>
      & { issuedBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'studentId' | 'username' | 'email' | 'status' | 'numberOfBooksCheckedOut'>
      ), issuedBook: (
        { __typename?: 'Book' }
        & Pick<Book, 'id' | 'isbnNumber' | 'rackNumber' | 'status'>
      ) }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'studentId' | 'username' | 'email' | 'status' | 'isLibrarian' | 'numberOfBooksCheckedOut' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserInputType;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'studentId' | 'username' | 'email' | 'status' | 'isLibrarian' | 'numberOfBooksCheckedOut' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type RenewBookMutationVariables = Exact<{
  days: Scalars['Int'];
  ISBNNumber: Scalars['Int'];
}>;


export type RenewBookMutation = (
  { __typename?: 'Mutation' }
  & { renewBook: (
    { __typename?: 'IssueBookResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, checkOutBook?: Maybe<(
      { __typename?: 'CheckedOutBooks' }
      & Pick<CheckedOutBooks, 'id' | 'returnDate' | 'returnedDate' | 'fine'>
      & { issuedBy: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), issuedBook: (
        { __typename?: 'Book' }
        & Pick<Book, 'id' | 'isbnNumber'>
      ) }
    )> }
  ) }
);

export type ReturnBookMutationVariables = Exact<{
  bookISBN: Scalars['Int'];
}>;


export type ReturnBookMutation = (
  { __typename?: 'Mutation' }
  & { returnBook: (
    { __typename?: 'IssueBookResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, checkOutBook?: Maybe<(
      { __typename?: 'CheckedOutBooks' }
      & Pick<CheckedOutBooks, 'id'>
    )> }
  ) }
);

export type BookItemQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BookItemQuery = (
  { __typename?: 'Query' }
  & { bookItem: (
    { __typename?: 'BookItem' }
    & Pick<BookItem, 'id' | 'title' | 'edition' | 'category' | 'numberOfCopies' | 'publicationDate' | 'createdAt'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'authorName' | 'description'>
    ), books: Array<(
      { __typename?: 'Book' }
      & Pick<Book, 'id' | 'isbnNumber' | 'rackNumber' | 'status' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type BookItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookItemsQuery = (
  { __typename?: 'Query' }
  & { bookItems: Array<(
    { __typename?: 'BookItem' }
    & Pick<BookItem, 'id' | 'title' | 'edition' | 'category' | 'numberOfCopies' | 'publicationDate' | 'createdAt'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'authorName' | 'description'>
    ), books: Array<(
      { __typename?: 'Book' }
      & Pick<Book, 'id' | 'isbnNumber' | 'rackNumber' | 'status' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type IssuedBookForCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type IssuedBookForCurrentUserQuery = (
  { __typename?: 'Query' }
  & { issuedBookForCurrentUser: Array<(
    { __typename?: 'IssuedBookForCurrentUser' }
    & Pick<IssuedBookForCurrentUser, 'id' | 'returnDate' | 'createdAt' | 'returnedDate' | 'fine' | 'title' | 'isbnNumber'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'studentId' | 'email' | 'status' | 'isLibrarian' | 'numberOfBooksCheckedOut' | 'createdAt' | 'updatedAt'>
  )> }
);

export type PaginatedBookItemsQueryVariables = Exact<{
  input?: Maybe<SearchBooksInput>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type PaginatedBookItemsQuery = (
  { __typename?: 'Query' }
  & { paginatedBookItems: (
    { __typename?: 'PaginatedBookItems' }
    & Pick<PaginatedBookItems, 'hasMore'>
    & { bookItems: Array<(
      { __typename?: 'BookItem' }
      & Pick<BookItem, 'id' | 'title' | 'edition' | 'category' | 'numberOfCopies' | 'publicationDate' | 'createdAt' | 'updatedAt'>
      & { author: (
        { __typename?: 'Author' }
        & Pick<Author, 'id' | 'authorName' | 'description'>
      ) }
    )> }
  ) }
);


export const AddBookItemDocument = gql`
    mutation AddBookItem($addBookItem: BookItemInputType!) {
  addBookItem(bookItemInput: $addBookItem) {
    id
    title
    author {
      id
      authorName
      description
    }
    edition
    category
    numberOfCopies
    publicationDate
    createdAt
    updatedAt
  }
}
    `;
export type AddBookItemMutationFn = Apollo.MutationFunction<AddBookItemMutation, AddBookItemMutationVariables>;

/**
 * __useAddBookItemMutation__
 *
 * To run a mutation, you first call `useAddBookItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookItemMutation, { data, loading, error }] = useAddBookItemMutation({
 *   variables: {
 *      addBookItem: // value for 'addBookItem'
 *   },
 * });
 */
export function useAddBookItemMutation(baseOptions?: Apollo.MutationHookOptions<AddBookItemMutation, AddBookItemMutationVariables>) {
        return Apollo.useMutation<AddBookItemMutation, AddBookItemMutationVariables>(AddBookItemDocument, baseOptions);
      }
export type AddBookItemMutationHookResult = ReturnType<typeof useAddBookItemMutation>;
export type AddBookItemMutationResult = Apollo.MutationResult<AddBookItemMutation>;
export type AddBookItemMutationOptions = Apollo.BaseMutationOptions<AddBookItemMutation, AddBookItemMutationVariables>;
export const AddCopiesOfBookToLibraryDocument = gql`
    mutation AddCopiesOfBookToLibrary($bookInput: BookInputType!) {
  addCopiesOfBookToLibrary(bookInput: $bookInput) {
    errors {
      field
      message
    }
    book {
      id
      isbnNumber
      rackNumber
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type AddCopiesOfBookToLibraryMutationFn = Apollo.MutationFunction<AddCopiesOfBookToLibraryMutation, AddCopiesOfBookToLibraryMutationVariables>;

/**
 * __useAddCopiesOfBookToLibraryMutation__
 *
 * To run a mutation, you first call `useAddCopiesOfBookToLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCopiesOfBookToLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCopiesOfBookToLibraryMutation, { data, loading, error }] = useAddCopiesOfBookToLibraryMutation({
 *   variables: {
 *      bookInput: // value for 'bookInput'
 *   },
 * });
 */
export function useAddCopiesOfBookToLibraryMutation(baseOptions?: Apollo.MutationHookOptions<AddCopiesOfBookToLibraryMutation, AddCopiesOfBookToLibraryMutationVariables>) {
        return Apollo.useMutation<AddCopiesOfBookToLibraryMutation, AddCopiesOfBookToLibraryMutationVariables>(AddCopiesOfBookToLibraryDocument, baseOptions);
      }
export type AddCopiesOfBookToLibraryMutationHookResult = ReturnType<typeof useAddCopiesOfBookToLibraryMutation>;
export type AddCopiesOfBookToLibraryMutationResult = Apollo.MutationResult<AddCopiesOfBookToLibraryMutation>;
export type AddCopiesOfBookToLibraryMutationOptions = Apollo.BaseMutationOptions<AddCopiesOfBookToLibraryMutation, AddCopiesOfBookToLibraryMutationVariables>;
export const IssueBookDocument = gql`
    mutation IssueBook($bookISBN: Int!) {
  issueBook(bookISBN: $bookISBN) {
    errors {
      field
      message
    }
    checkOutBook {
      id
      issuedBy {
        id
        studentId
        username
        email
        status
        numberOfBooksCheckedOut
      }
      issuedBook {
        id
        isbnNumber
        rackNumber
        status
      }
      createdAt
      returnDate
      returnedDate
      fine
    }
  }
}
    `;
export type IssueBookMutationFn = Apollo.MutationFunction<IssueBookMutation, IssueBookMutationVariables>;

/**
 * __useIssueBookMutation__
 *
 * To run a mutation, you first call `useIssueBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueBookMutation, { data, loading, error }] = useIssueBookMutation({
 *   variables: {
 *      bookISBN: // value for 'bookISBN'
 *   },
 * });
 */
export function useIssueBookMutation(baseOptions?: Apollo.MutationHookOptions<IssueBookMutation, IssueBookMutationVariables>) {
        return Apollo.useMutation<IssueBookMutation, IssueBookMutationVariables>(IssueBookDocument, baseOptions);
      }
export type IssueBookMutationHookResult = ReturnType<typeof useIssueBookMutation>;
export type IssueBookMutationResult = Apollo.MutationResult<IssueBookMutation>;
export type IssueBookMutationOptions = Apollo.BaseMutationOptions<IssueBookMutation, IssueBookMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    errors {
      field
      message
    }
    user {
      id
      studentId
      username
      email
      status
      isLibrarian
      numberOfBooksCheckedOut
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInputType!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      studentId
      username
      email
      status
      isLibrarian
      numberOfBooksCheckedOut
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RenewBookDocument = gql`
    mutation RenewBook($days: Int!, $ISBNNumber: Int!) {
  renewBook(days: $days, ISBNNumber: $ISBNNumber) {
    errors {
      field
      message
    }
    checkOutBook {
      id
      issuedBy {
        id
      }
      issuedBook {
        id
        isbnNumber
      }
      returnDate
      returnedDate
      fine
    }
  }
}
    `;
export type RenewBookMutationFn = Apollo.MutationFunction<RenewBookMutation, RenewBookMutationVariables>;

/**
 * __useRenewBookMutation__
 *
 * To run a mutation, you first call `useRenewBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenewBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renewBookMutation, { data, loading, error }] = useRenewBookMutation({
 *   variables: {
 *      days: // value for 'days'
 *      ISBNNumber: // value for 'ISBNNumber'
 *   },
 * });
 */
export function useRenewBookMutation(baseOptions?: Apollo.MutationHookOptions<RenewBookMutation, RenewBookMutationVariables>) {
        return Apollo.useMutation<RenewBookMutation, RenewBookMutationVariables>(RenewBookDocument, baseOptions);
      }
export type RenewBookMutationHookResult = ReturnType<typeof useRenewBookMutation>;
export type RenewBookMutationResult = Apollo.MutationResult<RenewBookMutation>;
export type RenewBookMutationOptions = Apollo.BaseMutationOptions<RenewBookMutation, RenewBookMutationVariables>;
export const ReturnBookDocument = gql`
    mutation ReturnBook($bookISBN: Int!) {
  returnBook(bookISBN: $bookISBN) {
    errors {
      field
      message
    }
    checkOutBook {
      id
    }
  }
}
    `;
export type ReturnBookMutationFn = Apollo.MutationFunction<ReturnBookMutation, ReturnBookMutationVariables>;

/**
 * __useReturnBookMutation__
 *
 * To run a mutation, you first call `useReturnBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnBookMutation, { data, loading, error }] = useReturnBookMutation({
 *   variables: {
 *      bookISBN: // value for 'bookISBN'
 *   },
 * });
 */
export function useReturnBookMutation(baseOptions?: Apollo.MutationHookOptions<ReturnBookMutation, ReturnBookMutationVariables>) {
        return Apollo.useMutation<ReturnBookMutation, ReturnBookMutationVariables>(ReturnBookDocument, baseOptions);
      }
export type ReturnBookMutationHookResult = ReturnType<typeof useReturnBookMutation>;
export type ReturnBookMutationResult = Apollo.MutationResult<ReturnBookMutation>;
export type ReturnBookMutationOptions = Apollo.BaseMutationOptions<ReturnBookMutation, ReturnBookMutationVariables>;
export const BookItemDocument = gql`
    query BookItem($id: Int!) {
  bookItem(id: $id) {
    id
    title
    author {
      id
      authorName
      description
    }
    edition
    category
    numberOfCopies
    books {
      id
      isbnNumber
      rackNumber
      status
      createdAt
      updatedAt
    }
    publicationDate
    createdAt
  }
}
    `;

/**
 * __useBookItemQuery__
 *
 * To run a query within a React component, call `useBookItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookItemQuery(baseOptions: Apollo.QueryHookOptions<BookItemQuery, BookItemQueryVariables>) {
        return Apollo.useQuery<BookItemQuery, BookItemQueryVariables>(BookItemDocument, baseOptions);
      }
export function useBookItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookItemQuery, BookItemQueryVariables>) {
          return Apollo.useLazyQuery<BookItemQuery, BookItemQueryVariables>(BookItemDocument, baseOptions);
        }
export type BookItemQueryHookResult = ReturnType<typeof useBookItemQuery>;
export type BookItemLazyQueryHookResult = ReturnType<typeof useBookItemLazyQuery>;
export type BookItemQueryResult = Apollo.QueryResult<BookItemQuery, BookItemQueryVariables>;
export const BookItemsDocument = gql`
    query BookItems {
  bookItems {
    id
    title
    author {
      id
      authorName
      description
    }
    edition
    category
    numberOfCopies
    books {
      id
      isbnNumber
      rackNumber
      status
      createdAt
      updatedAt
    }
    publicationDate
    createdAt
  }
}
    `;

/**
 * __useBookItemsQuery__
 *
 * To run a query within a React component, call `useBookItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookItemsQuery(baseOptions?: Apollo.QueryHookOptions<BookItemsQuery, BookItemsQueryVariables>) {
        return Apollo.useQuery<BookItemsQuery, BookItemsQueryVariables>(BookItemsDocument, baseOptions);
      }
export function useBookItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookItemsQuery, BookItemsQueryVariables>) {
          return Apollo.useLazyQuery<BookItemsQuery, BookItemsQueryVariables>(BookItemsDocument, baseOptions);
        }
export type BookItemsQueryHookResult = ReturnType<typeof useBookItemsQuery>;
export type BookItemsLazyQueryHookResult = ReturnType<typeof useBookItemsLazyQuery>;
export type BookItemsQueryResult = Apollo.QueryResult<BookItemsQuery, BookItemsQueryVariables>;
export const IssuedBookForCurrentUserDocument = gql`
    query IssuedBookForCurrentUser {
  issuedBookForCurrentUser {
    id
    returnDate
    createdAt
    returnedDate
    fine
    title
    isbnNumber
  }
}
    `;

/**
 * __useIssuedBookForCurrentUserQuery__
 *
 * To run a query within a React component, call `useIssuedBookForCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuedBookForCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuedBookForCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useIssuedBookForCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<IssuedBookForCurrentUserQuery, IssuedBookForCurrentUserQueryVariables>) {
        return Apollo.useQuery<IssuedBookForCurrentUserQuery, IssuedBookForCurrentUserQueryVariables>(IssuedBookForCurrentUserDocument, baseOptions);
      }
export function useIssuedBookForCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssuedBookForCurrentUserQuery, IssuedBookForCurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<IssuedBookForCurrentUserQuery, IssuedBookForCurrentUserQueryVariables>(IssuedBookForCurrentUserDocument, baseOptions);
        }
export type IssuedBookForCurrentUserQueryHookResult = ReturnType<typeof useIssuedBookForCurrentUserQuery>;
export type IssuedBookForCurrentUserLazyQueryHookResult = ReturnType<typeof useIssuedBookForCurrentUserLazyQuery>;
export type IssuedBookForCurrentUserQueryResult = Apollo.QueryResult<IssuedBookForCurrentUserQuery, IssuedBookForCurrentUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    studentId
    email
    status
    isLibrarian
    numberOfBooksCheckedOut
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaginatedBookItemsDocument = gql`
    query PaginatedBookItems($input: SearchBooksInput, $limit: Int!, $offset: Int!) {
  paginatedBookItems(input: $input, limit: $limit, offset: $offset) {
    bookItems {
      id
      title
      author {
        id
        authorName
        description
      }
      edition
      category
      numberOfCopies
      publicationDate
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __usePaginatedBookItemsQuery__
 *
 * To run a query within a React component, call `usePaginatedBookItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedBookItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedBookItemsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function usePaginatedBookItemsQuery(baseOptions: Apollo.QueryHookOptions<PaginatedBookItemsQuery, PaginatedBookItemsQueryVariables>) {
        return Apollo.useQuery<PaginatedBookItemsQuery, PaginatedBookItemsQueryVariables>(PaginatedBookItemsDocument, baseOptions);
      }
export function usePaginatedBookItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedBookItemsQuery, PaginatedBookItemsQueryVariables>) {
          return Apollo.useLazyQuery<PaginatedBookItemsQuery, PaginatedBookItemsQueryVariables>(PaginatedBookItemsDocument, baseOptions);
        }
export type PaginatedBookItemsQueryHookResult = ReturnType<typeof usePaginatedBookItemsQuery>;
export type PaginatedBookItemsLazyQueryHookResult = ReturnType<typeof usePaginatedBookItemsLazyQuery>;
export type PaginatedBookItemsQueryResult = Apollo.QueryResult<PaginatedBookItemsQuery, PaginatedBookItemsQueryVariables>;
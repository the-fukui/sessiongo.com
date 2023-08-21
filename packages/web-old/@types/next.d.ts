type GetSSRResult<TProps> =
  | { props: TProps }
  | { redirect: any }
  | { notFound: true }
type GetSSRFn<TProps extends any> = (args: any) => Promise<GetSSRResult<TProps>>
type InferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<
  infer TProps
>
  ? NonNullable<TProps>
  : never

type PageContainerProps<T> = inferSSRProps<T>
type PresenterProps<T> = ReturnType<T>

type _NextApiRequest = import('next').NextApiRequest
type _NextApiResponse<T> = import('next').NextApiResponse<T>
type APIErrorMessage = { Error: { Message: string } }

interface NextApiRequest<
  Query extends _NextApiRequest['query'] = _NextApiRequest['query'],
  Body = any,
> extends _NextApiRequest {
  query: Query
  body: Body
}

interface NextApiResponse<Response extends any>
  extends _NextApiResponse<Response | APIErrorMessage> {}

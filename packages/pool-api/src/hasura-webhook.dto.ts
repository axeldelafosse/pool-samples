export class HasuraWebhookDto {
  public readonly id: string;
  public readonly created_at: string;

  public readonly delivery_info: {
    max_retries: number;
    current_retry: number;
  };

  public readonly event: {
    session_variables: null;
    op: string;
    data: {
      old: { [key: string]: any } | null;
      new: { [key: string]: any };
    };
  };

  public readonly trigger: {
    name: string;
  };

  public readonly table: {
    schema: string;
    name: string;
  };
}

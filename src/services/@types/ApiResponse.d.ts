interface ApiResponse<TData> {
  success: boolean;
  message: string;
  meta: Meta;
  data: TData;
}

interface Meta {
  total: number;
  pages: number;
  currentPage: number;
}

export interface Device {
  id: number;
  name: string;
  location: string;
  purchase_date: string;
  in_use: number | boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface DeviceRequest {
  name: string;
  location: string;
  purchase_date: string;
  in_use: boolean;
}

export interface DeviceResponse {
  success: boolean;
  message: string;
  data: Device;
}

export interface DeviceListResponse {
  success: boolean;
  message: string;
  data: {
    data: Device[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}

export interface DeviceFilters {
  page?: number;
  per_page?: number;
  in_use?: boolean;
  location?: string;
  date_from?: string;
  date_to?: string;
}

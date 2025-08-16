// Giphy API response types based on official documentation
export interface GiphyGif {
  type: string
  id: string
  url: string
  slug: string
  bitly_gif_url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  title: string
  rating: string
  content_url: string
  source_tld: string
  source_post_url: string
  is_sticker: number
  import_datetime: string
  trending_datetime: string
  images: GiphyImages
  user?: GiphyUser
  analytics_response_payload: string
  analytics: GiphyAnalytics
}

export interface GiphyImages {
  original: GiphyImage
  downsized: GiphyImage
  downsized_large: GiphyImage
  downsized_medium: GiphyImage
  downsized_small: GiphyImage
  downsized_still: GiphyImage
  fixed_height: GiphyImage
  fixed_height_downsampled: GiphyImage
  fixed_height_small: GiphyImage
  fixed_height_small_still: GiphyImage
  fixed_height_still: GiphyImage
  fixed_width: GiphyImage
  fixed_width_downsampled: GiphyImage
  fixed_width_small: GiphyImage
  fixed_width_small_still: GiphyImage
  fixed_width_still: GiphyImage
  preview_gif: GiphyImage
  preview_webp: GiphyImage
  '480w_still': GiphyImage
}

export interface GiphyImage {
  height: string
  width: string
  size: string
  url: string
  mp4_size?: string
  mp4?: string
  webp_size?: string
  webp?: string
  frames?: string
  hash?: string
}

export interface GiphyUser {
  avatar_url: string
  banner_image: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
  description: string
  instagram_url: string
  website_url: string
  is_verified: boolean
}

export interface GiphyAnalytics {
  onload: { url: string }
  onclick: { url: string }
  onsent: { url: string }
}

export interface GiphyPagination {
  total_count: number
  count: number
  offset: number
}

export interface GiphyMeta {
  status: number
  msg: string
  response_id: string
}

export interface GiphyResponse {
  data: GiphyGif[]
  pagination: GiphyPagination
  meta: GiphyMeta
}

export interface GiphySearchParams {
  q: string
  limit?: number
  offset?: number
  rating?: 'y' | 'g' | 'pg' | 'pg-13' | 'r'
  lang?: string
  random_id?: string
  bundle?: 'messaging_non_clips' | 'sticker_layering' | 'low_bandwidth'
}

export interface GiphyTrendingParams {
  limit?: number
  offset?: number
  rating?: 'y' | 'g' | 'pg' | 'pg-13' | 'r'
  random_id?: string
  bundle?: 'messaging_non_clips' | 'sticker_layering' | 'low_bandwidth'
}

export interface UserInfo {
  id: number
  email_verified: boolean
  nickname: string
  short_bio: string
  subscribe_to_marketing: boolean
  image_origin_s3key: string
  image_thumbnail_s3key: string
  created_at: Date
  updated_at: Date
}
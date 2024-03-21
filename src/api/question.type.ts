export interface QuestionInfo {
  id: number
  created_at: Date
  updated_at: Date
  user_id: number
  subject: string
  content: string
  image_origin_s3key: string
  image_thumbnail_s3key: string
  bounty: number
  status: string
}

export interface TermsAgreement {
  policy_and_terms: boolean
  subscribe_to_marketing: boolean
}

export interface UserInfo {
  id: number
  email_verified: boolean
  nickname: string
  short_bio: string
  terms_and_marketing_agreement: TermsAgreement
  image_origin_s3key: string
  image_thumbnail_s3key: string
  created_at: Date
  updated_at: Date
}

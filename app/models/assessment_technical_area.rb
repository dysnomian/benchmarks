class AssessmentTechnicalArea < ApplicationRecord
  include AssessmentTechnicalAreaSeed

  belongs_to :assessment_publication
  has_many :assessment_indicators

  default_scope { order(:sequence) }
  scope :jee1,
        Proc.new { AssessmentPublication.jee1.assessment_technical_areas }
  scope :spar_2018,
        Proc.new { AssessmentPublication.spar_2018.assessment_technical_areas }

  # TODO: this method is lacking test coverage
  def self.named_id_for(publication_named_id, indicator_named_id)
    ind_short_code =
      if publication_named_id.starts_with?("spar")
        indicator_named_id.split("_").fourth
      else
        indicator_named_id.split("_").third
      end
    ind_short_code_minus_last_one = ind_short_code[0..-2]
    "#{publication_named_id}_ta_#{ind_short_code_minus_last_one}"
  end
end

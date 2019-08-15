class PlanController < ApplicationController
  def show
    @benchmarks = BenchmarksFixture.new
    @plan = Plan.find_by_id!(params.fetch(:id))
  end

  def update
    plan = Plan.find_by_id!(params.fetch(:id))
    plan.update!(
      name: plan_params.fetch(:name),
      activity_map: JSON.parse(plan_params.fetch(:activity_map))
    )
    redirect_to plan
  end

  private

  def plan_params
    params.require(:plan).permit(:name, :activity_map)
  end
end
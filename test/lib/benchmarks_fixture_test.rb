require 'test_helper'

class BenchmarksFixtureTest < ActiveSupport::TestCase
  test 'reports activities for the requested level' do
    benchmarks = BenchmarksFixture.new

    activities = benchmarks.capacity_activities('1.1', 2)
    assert_equal activities.length, 6
    assert_equal activities[0],
                 'Identify and convene key stakeholders related to the review, formulation and implementation of legislation and policies.'
  end

  test 'calculates activities for a score/goal range' do
    benchmarks = BenchmarksFixture.new

    activities = benchmarks.goal_activities('1.1', 2, 4)
    assert_equal activities.length, 8
    assert_equal activities[0],
                 'Conduct an orientation with relevant stakeholders regarding adjustment in the legislation, laws, regulations, policy and administrative requirements.'
    assert_equal activities[7],
                 'Document these legislation references and relevant interpretations that can assist in IHR implementation.'
  end

  test 'raises an exception if a parameter is out of range' do
    benchmarks = BenchmarksFixture.new
    assert_raises(RangeError) { benchmarks.capacity_activities '1.1', 0 }
    assert_raises(RangeError) { benchmarks.capacity_activities '1.1', 6 }
    assert_raises(RangeError) { benchmarks.goal_activities '1.1', 6, 5 }
    assert_raises(RangeError) { benchmarks.goal_activities '1.1', 0, 5 }
    assert_raises(RangeError) { benchmarks.goal_activities '1.1', 1, 0 }
    assert_raises(RangeError) { benchmarks.goal_activities '1.1', 1, 6 }
    assert_raises(ArgumentError) { benchmarks.goal_activities '1.1', 5, 3 }
  end
end

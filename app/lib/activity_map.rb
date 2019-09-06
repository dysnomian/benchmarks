# An organized map of all activities in the draft plan.
class ActivityMap
  def initialize(m)
    @m = m
  end

  # Return a sorted list of BenchmarkIds for those benchmarks that are present
  # in the draft plan.
  def benchmarks
    @m.keys.map { |benchmark_id_str| BenchmarkId.from_s benchmark_id_str }.sort
  end

  # Return a list of Technical Capacity ids for those benchmarks that are
  # present in the draft plan.
  def capacities
    benchmarks.map(&:capacity)
  end

  # Return a list of BenchmarkIds corresponding to the specified Technical
  # Capacity present in the draft plan.
  def capacity_benchmarks(capacity_id_str)
    capacity_id = Integer(capacity_id_str)
    @m.keys.map do |benchmark_id_str|
      BenchmarkId.from_s benchmark_id_str
    end.filter { |benchmark_id| benchmark_id.capacity == capacity_id }.sort
  end

  # Return a dictionary mapping BenchmarkId => Activities, for all benchmarks
  # that match the specified Technical Capacity id.
  def capacity_activities(capacity_id_str)
    capacity_id = Integer(capacity_id_str)
    capacity_benchmarks(capacity_id).reduce({}) do |acc, benchmark_id|
      acc[benchmark_id.to_s] = benchmark_activities(benchmark_id)
      acc
    end
  end

  # Return a list of all activities in the specified BenchmarkId.
  def benchmark_activities(benchmark_id)
    @m[benchmark_id.to_s]
  end

  def to_json
    @m.to_json
  end
end

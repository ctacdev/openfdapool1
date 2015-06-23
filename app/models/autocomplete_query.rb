class AutocompleteQuery
  attr_reader :relation, :options

  DEFAULT_RESULTS_LIMIT = 1000

  def initialize options = {}
    @options = options
  end

  def self.search options = {}
    new(options).search
  end

  def search
    {
      "meta" => meta_data,
      "results" => results
    }
  end

  private

  def results
    ActiveIngredient.
      where("name LIKE ?", "#{query}%").
      limit(results_limit).
      offset(skip_count)
  end

  def meta_data
    {
      "results" => {
        "limit" => results_limit,
        "total" => ActiveIngredient.count,
        "skip"  => skip_count,
        "count" => results.count
      }
    }
  end

  def query
    options.fetch(:query, nil)
  end

  def results_limit
    options.fetch(:limit, DEFAULT_RESULTS_LIMIT)
  end

  def skip_count
    options.fetch(:skip, 0)
  end
end

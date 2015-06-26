# Feature: Home page
#   As a visitor
#   I want to visit a home page
#   So I can learn more about the website
feature 'Style guide' do

  # Scenario: Visit the home page
  #   Given I am a visitor
  #   When I visit the home page
  #   Then I see "Welcome"
  scenario 'visit the page' do
    visit style_guide_path
    expect(page).to have_content 'PharmaQuery Style Guide'
  end

end

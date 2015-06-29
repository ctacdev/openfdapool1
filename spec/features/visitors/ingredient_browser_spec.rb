# Feature: Home page
#   As a visitor
#   I want to visit a home page
#   So I can learn more about the website
feature 'Ingredient Browser page' do

  # Scenario: Visit the home page
  #   Given I am a visitor
  #   When I visit the home page
  #   Then I see "Welcome"
  scenario 'visit the widget' do
    visit ingredient_browser_path
    expect(page).to have_content 'The Ingredient Browser'
  end

  scenario 'default to smaller widget' do
    visit ingredient_browser_path
    expect(page).to have_css '#bubblechartcontainer.smaller'
  end

  scenario 'expand to fullscreen widget' do
    visit ingredient_browser_path
    click_button 'Toggle Visualization Size'
    expect(page).not_to have_css '#bubblechartcontainer.smaller'
  end

  scenario 'returns to smaller size' do
    visit ingredient_browser_path
    click_button 'Toggle Visualization Size'
    click_button 'Toggle Visualization Size'
    expect(page).to have_css '#bubblechartcontainer.smaller'
  end
end

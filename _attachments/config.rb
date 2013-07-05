# Require any additional compass plugins here.
require 'susy';

http_path = '/'

asset_path = ''

css_dir         = asset_path + '/css'
sass_dir        = asset_path + '/sass'
images_dir      = asset_path + '/images'
javascripts_dir = asset_path + '/javascripts'
fonts_dir       = asset_path + '/fonts'

# Enable debug info to use source maps. Works in Chrome Dev Tools.
sass_options = {:debug_info => true}

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

module Sass::Script::Functions
  # https://gist.github.com/1561650
  def random(max = Sass::Script::Number.new(100))
    Sass::Script::Number.new(rand(max.value), max.numerator_units, max.denominator_units)
  end
  
  # Wrapper around Ruby's Array#include? method.
  # https://gist.github.com/4088394
  #
  # value - Value to check for in the list.
  # list  - List to look through.
  #
  # Examples
  #   
  #   $list: a b c;
  #   @debug contains(b, $list);
  #   # => true
  #
  # Returns True if the value is found in the list, false if it isn't.
  def contains(value, list)
    assert_type list, :List
    
    Sass::Script::Bool.new(list.value.include?(value))
  end
  declare :contains, [:value, :list]
  
  # Wrapper around Ruby's Array#index method.
  # https://gist.github.com/4088385
  #
  # value - The value in the list to search for.
  # list  - The list to search through.
  #
  # Examples
  #   
  #   $list: a b c;
  #   @debug location(b, $list);
  #   # => 2
  #
  # Returns The index of the value in the list, or false if nothing is found.
  def location(value, list)
    assert_type list, :List
  
    index = list.value.index(value)
  
    if index.nil?
      Sass::Script::Bool.new(false)
    else
      Sass::Script::Number.new(index + 1)
    end
  end
  declare :location, [:value, :list]
end
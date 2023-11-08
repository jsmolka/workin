# sudo apt-get install fonttools

# https://jrgraphix.net/r/Unicode/
# U+0000-007F  Latin
# U+0080-00FF  Latin-1 Supplement
pyftsubset Inter.ttf --unicodes="U+0000-00FF" --layout-features="calt,kern,tnum" --flavor="woff2" --output-file="inter.woff2"

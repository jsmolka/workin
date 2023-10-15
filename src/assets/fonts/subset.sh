# sudo apt-get install fonttools

# https://jrgraphix.net/r/Unicode/
# U+0000-007F  Latin
# U+0080-00FF  Latin-1 Supplement
pyftsubset Inter.ttf --unicodes="U+0000-00FF" --layout-features="calt,kern,cv07,tnum" --flavor="woff2" --output-file="inter.woff2"
pyftsubset Inter-Italic.ttf --unicodes="U+0000-00FF" --layout-features="calt,kern,cv07,tnum" --flavor="woff2" --output-file="inter-italic.woff2"

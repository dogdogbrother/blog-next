interface SearchFunc {
  (source: string, subString: string): boolean
}
let search: SearchFunc = function(s1, s2) {
  return s1 === s2
}
search('1', '2')

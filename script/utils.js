/**
 * http链接转为https
 * 图片url
 */

export let httpToHttps = URL => {
  return URL.replace(/https|http/, 'https')
};
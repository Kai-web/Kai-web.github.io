---
title: url传参中的encodeURIComponent()
---

# url传参中的encodeURIComponent()

## 注意①

- 在 URL 中传递参数时，一些特殊字符（例如 #、%、& 等）具有特殊的含义，用于表示 URL 的结构或特定的编码方式。如果你希望在 URL 参数中包含这些特殊字符，需要进行编码，以确保 URL 的正确性和一致性。

## 注意②

- encodeURIComponent 是 JavaScript 提供的一个函数，用于对 URL 参数进行编码。它可以将特殊字符转换为它们的编码表示，以便它们在 URL 中被正确解析。

## 注意③

- 对于 #FFFFFF 这样的参数值，# 符号在 URL 中表示锚点（anchor），而不是普通的字符。为了避免将 # 解释为 URL 中的特殊字符，我们使用 encodeURIComponent 将其转换为 %23，这是 # 的编码表示。

## 参考链接：

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

## 示例

- 如何使用 encodeURIComponent 对 #FFFFFF 进行编码

```js
const color = '#FFFFFF';
const encodedColor = encodeURIComponent(color);
console.log(encodedColor); // 输出：%23FFFFFF
```

## 对url中的多个参数进行encodeURIComponent编码

```js
const url = paramsEnCodeURI('https://xxxx.com?markWordsColor=#FFFFFF&markBgColor=#F3F3F3&wordsColor=#000000');

function paramsEnCodeURI(url) {
  // 要替换的参数列表
  const paramsToEncode = ['markWordsColor', 'markBgColor', 'wordsColor'];
  paramsToEncode.forEach(function(param) {
    const regex = new RegExp(param + '=([^&]*)');
    if (url.match(regex)) {
      const encodedValue = encodeURIComponent(url.match(regex)[1]);
      url = url.replace(regex, param + '=' + encodedValue);
    }
  });
  return url;
}
```
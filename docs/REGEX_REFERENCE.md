# Regex Kit 内置正则参考手册

[简体中文](https://github.com/SailingCoder/regex-pack/blob/main/doc/REGEX_REFERENCE.md) | [English](https://github.com/SailingCoder/regex-pack/blob/main/docs/REGEX_REFERENCE_EN.md)

本文档汇总了 Regex Kit 内置的全部正则表达式，按类别分组，便于快速查找与使用。共涵盖 14 个分类文件、113 大类验证规则，几乎覆盖 99.9% 的日常开发场景。

所有正则均经过严格测试，确保在生产环境中的高准确性与兼容性。


## 快速导航

**核心基础** | **业务应用** | **技术开发** | **地理杂项**
:---: | :---: | :---: | :---:
[基础验证](#基础验证-basic) | [商务验证](#商务验证-business) | [技术相关](#技术相关-tech) | [地理位置](#地理位置-location)
[身份验证](#身份验证-identity) | [社交平台](#社交平台-social) | [现代化场景](#现代化场景-modern) | [杂项验证](#杂项-misc)
[金融财务](#金融财务-financial) | [媒体相关](#媒体相关-media) | [格式验证](#格式验证-format) |
[安全相关](#安全相关-security) | [交通运输](#交通运输-transport) | |

## 常用正则速查表

| 类型 | 语法 | 说明 | 示例 |
|------|------|------|------|
| **邮箱** | `email` | 基础邮箱格式 | `rx.test('email', 'user@example.com')` |
| | `email:strict` | 严格邮箱格式 | `rx.test('email:strict', 'user@company.com')` |
| | `email:enterprise` | 企业邮箱格式 | `rx.test('email:enterprise', 'admin@company.com')` |
| **手机号** | `phone:CN` | 中国手机号 | `rx.test('phone:CN', '13800138000')` |
| | `phone:US` | 美国手机号 | `rx.test('phone:US', '+1-555-123-4567')` |
| **身份证** | `idCard:CN` | 中国身份证 | `rx.test('idCard:CN', '110101199003077777')` |
| **银行卡** | `bankCard:CN` | 中国银行卡 | `rx.test('bankCard:CN', '6222600260001234567')` |
| **URL** | `url` | 基础URL格式 | `rx.test('url', 'https://example.com')` |
| **IP地址** | `ip:v4` | IPv4地址 | `rx.test('ip:v4', '192.168.1.1')` |
| | `ip:v6` | IPv6地址 | `rx.test('ip:v6', '2001:db8::1')` |
| **数字** | `number:integer` | 整数 | `rx.test('number:integer', '123')` |
| | `number:decimal` | 小数 | `rx.test('number:decimal', '123.45')` |
| **日期** | `date:YYYY-MM-DD` | 标准日期 | `rx.test('date:YYYY-MM-DD', '2024-01-01')` |
| **密码** | `password:medium` | 中等强度密码 | `rx.test('password:medium', 'Password123')` |
| | `password:strong` | 强密码 | `rx.test('password:strong', 'Password123!')` |

> 💡 **提示**：所有正则都支持 `type:group` 语法，如 `phone:CN`、`email:enterprise`

## 基础验证 (Basic)

### 邮箱验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>email</code></td>
<td><code>/^[^\s@]+@[^\s@]+\.[^\s@]+$/</code></td>
<td>基础邮箱格式</td>
<td><code>test@example.com</code>、<code>user@domain.org</code>、<code>name123@site.co</code>、<code>user.name@test-domain.com</code></td>
<td><code>invalid-email</code>、<code>user@</code>、<code>@domain.com</code>、<code>user space@domain.com</code>、<code>user@domain</code>、<code>user@@domain.com</code></td>
</tr>
<tr>
<td><code>email:strict</code></td>
<td><code>/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/</code></td>
<td>严格邮箱格式（RFC 5322标准）</td>
<td><code>user123@domain.com</code>、<code>test.email@site.org</code>、<code>name_tag@example.co.uk</code>、<code>user.name@domain.com</code></td>
<td><code>user@domain</code>、<code>test@.com</code>、<code>user space@domain.com</code>、<code>.user@domain.com</code>、<code>user.@domain.com</code></td>
</tr>
<tr>
<td><code>email:enterprise</code></td>
<td><code>/^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail|outlook|qq|163|126|sina|sohu|live|msn)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/</code></td>
<td>企业邮箱格式（排除常见免费邮箱）</td>
<td><code>admin@company.com</code>、<code>user@corp.com</code>、<code>employee@business.org</code>、<code>contact@startup.io</code></td>
<td><code>user@gmail.com</code>、<code>test@yahoo.com</code>、<code>name@hotmail.com</code>、<code>user@qq.com</code>、<code>admin@163.com</code>、<code>user@sina.com</code></td>
</tr>
</tbody>
</table>

### 手机号验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>phone</code></td>
<td><code>/^1[3-9]\d{9}$/</code></td>
<td>中国大陆手机号</td>
<td><code>13800138000</code>、<code>15912345678</code>、<code>18888888888</code>、<code>17712345678</code></td>
<td><code>12345678901</code>、<code>1380013800</code>、<code>138001380000</code>、<code>10800138000</code></td>
</tr>
<tr>
<td><code>phone:US</code></td>
<td><code>/^\+1[2-9]\d{2}[2-9]\d{6}$/</code></td>
<td>美国手机号</td>
<td><code>+12345678900</code>、<code>+15551234567</code>、<code>+19876543210</code></td>
<td><code>2345678900</code>、<code>+11234567890</code>、<code>+12345678</code>、<code>12345678900</code></td>
</tr>
<tr>
<td><code>phone:UK</code></td>
<td><code>/^\+44[1-9]\d{8,9}$/</code></td>
<td>英国手机号</td>
<td><code>+447123456789</code>、<code>+441234567890</code>、<code>+447987654321</code></td>
<td><code>+4471234567</code>、<code>+440123456789</code>、<code>07123456789</code></td>
</tr>
<tr>
<td><code>phone:HK</code></td>
<td><code>/^[569]\d{7}$/</code></td>
<td>香港手机号</td>
<td><code>51234567</code>、<code>61234567</code>、<code>91234567</code></td>
<td><code>41234567</code>、<code>123456789</code>、<code>5123456</code></td>
</tr>
<tr>
<td><code>phone:TW</code></td>
<td><code>/^09\d{8}$/</code></td>
<td>台湾手机号</td>
<td><code>0912345678</code>、<code>0987654321</code>、<code>0923456789</code></td>
<td><code>12345678</code>、<code>091234567</code>、<code>09123456789</code></td>
</tr>
<tr>
<td><code>phone:JP</code></td>
<td><code>/^0\d{1,4}-\d{1,4}-\d{4}$/</code></td>
<td>日本手机号（包括固话和手机）</td>
<td><code>090-1234-5678</code>、<code>080-9876-5432</code>、<code>070-1111-2222</code>、<code>03-1234-5678</code>、<code>06-123-4567</code></td>
<td><code>901234-5678</code>、<code>090-12345-678</code>、<code>0901234-5678</code>、<code>050-1234-567</code>、<code>1-1234-5678</code></td>
</tr>
</tbody>
</table>

### URL验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>url</code></td>
<td><code>/^https?:\/\/.+/</code></td>
<td>基础URL格式</td>
<td><code>https://example.com</code>、<code>http://test.org/path</code>、<code>https://sub.domain.com/path?query=1</code></td>
<td><code>example.com</code>、<code>ftp://site.com</code>、<code>https://</code>、<code>http://</code></td>
</tr>
<tr>
<td><code>url:strict</code></td>
<td><code>/^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/</code></td>
<td>严格URL格式</td>
<td><code>https://www.example.com/path</code>、<code>http://sub.domain.org:8080/api?id=1</code></td>
<td><code>https://</code>、<code>http://invalid space.com</code>、<code>https://domain.</code></td>
</tr>
<tr>
<td><code>url:ftp</code></td>
<td><code>/^ftp:\/\/[\w\.-]+(?::\d+)?(?:\/.*)?$/</code></td>
<td>FTP地址</td>
<td><code>ftp://ftp.example.com</code>、<code>ftp://192.168.1.1:21/path</code></td>
<td><code>http://example.com</code>、<code>ftp://</code>、<code>ftp://invalid space.com</code></td>
</tr>
</tbody>
</table>

### 域名验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>domain</code></td>
<td><code>/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/</code></td>
<td>标准域名格式</td>
<td><code>example.com</code>、<code>sub.domain.org</code>、<code>test-site.co.uk</code>、<code>a.b.c.d</code></td>
<td><code>example</code>、<code>example.</code>、<code>.example.com</code>、<code>example..com</code>、<code>-example.com</code></td>
</tr>
<tr>
<td><code>domain:subdomain</code></td>
<td><code>/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/</code></td>
<td>包含子域名</td>
<td><code>www.example.com</code>、<code>api.sub.domain.org</code>、<code>cdn.site.co.uk</code></td>
<td><code>example.com</code>、<code>sub.</code>、<code>.example.com</code>、<code>sub..domain.com</code></td>
</tr>
</tbody>
</table>

### IP地址验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ip</code></td>
<td><code>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/</code></td>
<td>IPv4地址</td>
<td><code>192.168.1.1</code>、<code>10.0.0.1</code>、<code>255.255.255.255</code>、<code>127.0.0.1</code></td>
<td><code>192.168.1.256</code>、<code>10.0.0</code>、<code>192.168.1.1.1</code>、<code>abc.def.ghi.jkl</code></td>
</tr>
<tr>
<td><code>ip:v6</code></td>
<td><code>/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/</code></td>
<td>IPv6地址</td>
<td><code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>、<code>fe80:0000:0000:0000:0202:b3ff:fe1e:8329</code></td>
<td><code>192.168.1.1</code>、<code>2001:0db8:85a3::8a2e:0370:7334:extra</code>、<code>invalid:ipv6</code></td>
</tr>
<tr>
<td><code>ip:private_v4</code></td>
<td><code>/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/</code></td>
<td>私有IPv4地址</td>
<td><code>10.0.0.1</code>、<code>172.16.0.1</code>、<code>192.168.1.1</code>、<code>172.31.255.255</code></td>
<td><code>8.8.8.8</code>、<code>172.15.0.1</code>、<code>192.167.1.1</code>、<code>11.0.0.1</code></td>
</tr>
</tbody>
</table>

### 端口号验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>port</code></td>
<td><code>/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/</code></td>
<td>标准端口号(1-65535)</td>
<td><code>80</code>、<code>443</code>、<code>8080</code>、<code>3000</code>、<code>65535</code></td>
<td><code>0</code>、<code>65536</code>、<code>99999</code>、<code>abc</code>、<code></code></td>
</tr>
<tr>
<td><code>port:well_known</code></td>
<td><code>/^([1-9][0-9]{0,2}|10[0-1][0-9]|102[0-3])$/</code></td>
<td>知名端口号(1-1023)</td>
<td><code>21</code>、<code>22</code>、<code>23</code>、<code>25</code>、<code>53</code>、<code>80</code>、<code>110</code>、<code>143</code>、<code>443</code>、<code>993</code>、<code>995</code></td>
<td><code>0</code>、<code>1024</code>、<code>8080</code>、<code>abc</code></td>
</tr>
</tbody>
</table>

---

## 身份验证 (Identity)

### 身份证验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>idCard</code></td>
<td><code>/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/</code></td>
<td>中国大陆身份证</td>
<td><code>110101199003077777</code>、<code>44030119851201001X</code>、<code>330106198506061234</code>、<code>510107199512125678</code>、<code>210102199801011234</code></td>
<td><code>12345678901234567</code>、<code>110101199003077</code>、<code>110101199913077777</code>、<code>000101199003077777</code>、<code>11010119900307777A</code></td>
</tr>
<tr>
<td><code>idCard:HK</code></td>
<td><code>/^[A-Z]\d{6}\(\d\)$/</code></td>
<td>香港身份证</td>
<td><code>A123456(7)</code>、<code>B987654(3)</code>、<code>Z555666(1)</code></td>
<td><code>A1234567</code>、<code>123456(7)</code>、<code>A123456(A)</code></td>
</tr>
<tr>
<td><code>idCard:TW</code></td>
<td><code>/^[A-Z][12]\d{8}$/</code></td>
<td>台湾身份证</td>
<td><code>A123456789</code>、<code>B223456789</code>、<code>Z187654321</code></td>
<td><code>A023456789</code>、<code>123456789</code>、<code>AA23456789</code></td>
</tr>
</tbody>
</table>

### 护照验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>passport</code></td>
<td><code>/^[a-zA-Z]\d{8}$/</code></td>
<td>中国护照</td>
<td><code>E12345678</code>、<code>G87654321</code>、<code>P11111111</code></td>
<td><code>12345678</code>、<code>E1234567</code>、<code>E123456789</code>、<code>EE2345678</code></td>
</tr>
<tr>
<td><code>passport:US</code></td>
<td><code>/^\d{9}$/</code></td>
<td>美国护照</td>
<td><code>123456789</code>、<code>987654321</code>、<code>111111111</code></td>
<td><code>12345678</code>、<code>1234567890</code>、<code>A12345678</code></td>
</tr>
<tr>
<td><code>passport:UK</code></td>
<td><code>/^\d{9}$/</code></td>
<td>英国护照</td>
<td><code>123456789</code>、<code>987654321</code>、<code>555555555</code></td>
<td><code>12345678</code>、<code>1234567890</code>、<code>GB1234567</code></td>
</tr>
</tbody>
</table>

### 用户名验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>username</code></td>
<td><code>/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/</code></td>
<td>标准用户名</td>
<td><code>user123</code>、<code>admin_user</code>、<code>testUser</code>、<code>a_b_c</code></td>
<td><code>123user</code>、<code>us</code>、<code>user@name</code>、<code>very_long_username_here</code></td>
</tr>
<tr>
<td><code>username:strict</code></td>
<td><code>/^[a-zA-Z][a-zA-Z0-9]{3,15}$/</code></td>
<td>严格用户名(无下划线)</td>
<td><code>user123</code>、<code>admin</code>、<code>testUser</code>、<code>abc123</code></td>
<td><code>123user</code>、<code>us</code>、<code>user_name</code>、<code>user@name</code></td>
</tr>
</tbody>
</table>

### 驾照验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>driverLicense</code></td>
<td><code>/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[\dXx]$/</code></td>
<td>中国驾驶证</td>
<td><code>110101199003077777</code>、<code>44030119851201001X</code>、<code>330106198506061234</code></td>
<td><code>12345678901234567</code>、<code>110101199003077</code>、<code>110101199913077777</code></td>
</tr>
<tr>
<td><code>driverLicense:US</code></td>
<td><code>/^[A-Z]\d{7,8}$/</code></td>
<td>美国驾驶证</td>
<td><code>A1234567</code>、<code>B12345678</code>、<code>Z9876543</code></td>
<td><code>1234567</code>、<code>A123456</code>、<code>A123456789</code>、<code>AA123456</code></td>
</tr>
</tbody>
</table>

---

## 金融财务 (Financial)

### 银行卡验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>bankCard</code></td>
<td><code>/^[3-6]\d{15,18}$/</code></td>
<td>中国银行卡号</td>
<td><code>6225757711234567</code>、<code>4367421234567890</code>、<code>3704123456789012</code>、<code>6212345678901234567</code>、<code>5555444433332222</code></td>
<td><code>123456789</code>、<code>62257577112345</code>、<code>1234567890123456789</code>、<code>2225757711234567</code>、<code>722575771123456789</code></td>
</tr>
<tr>
<td><code>bankCard:visa</code></td>
<td><code>/^4[0-9]{12}(?:[0-9]{3})?$/</code></td>
<td>Visa卡号</td>
<td><code>4111111111111111</code>、<code>4012888888881881</code>、<code>4222222222222</code>、<code>4000000000000002</code>、<code>4242424242424242</code></td>
<td><code>5111111111111111</code>、<code>411111111111111</code>、<code>41111111111111111</code>、<code>3111111111111111</code>、<code>4111-1111-1111-1111</code></td>
</tr>
<tr>
<td><code>bankCard:mastercard</code></td>
<td><code>/^5[1-5][0-9]{14}$/</code></td>
<td>MasterCard卡号</td>
<td><code>5555555555554444</code>、<code>5105105105105100</code>、<code>5111111111111118</code>、<code>5200000000000005</code>、<code>5454545454545454</code></td>
<td><code>4111111111111111</code>、<code>555555555555444</code>、<code>55555555555544441</code>、<code>6111111111111117</code>、<code>5055555555554444</code></td>
</tr>
<tr>
<td><code>bankCard:amex</code></td>
<td><code>/^3[47][0-9]{13}$/</code></td>
<td>American Express卡号</td>
<td><code>378282246310005</code>、<code>371449635398431</code>、<code>341111111111111</code></td>
<td><code>4111111111111111</code>、<code>37828224631000</code>、<code>3782822463100051</code></td>
</tr>
<tr>
<td><code>bankCard:unionpay</code></td>
<td><code>/^62[0-9]{14,17}$/</code></td>
<td>银联卡号</td>
<td><code>6212345678901234</code>、<code>6225757711234567890</code>、<code>62123456789012345</code></td>
<td><code>4111111111111111</code>、<code>621234567890123</code>、<code>622575771123456789012</code></td>
</tr>
</tbody>
</table>

### 信用卡验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>creditCard</code></td>
<td><code>/^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/</code></td>
<td>通用信用卡格式</td>
<td><code>1234567890123456</code>、<code>1234 5678 9012 3456</code>、<code>1234-5678-9012-3456</code></td>
<td><code>123456789012345</code>、<code>1234 5678 9012 345</code>、<code>abcd-efgh-ijkl-mnop</code></td>
</tr>
<tr>
<td><code>creditCard:formatted</code></td>
<td><code>/^\d{4}[\s-]\d{4}[\s-]\d{4}[\s-]\d{4}$/</code></td>
<td>格式化信用卡号</td>
<td><code>1234 5678 9012 3456</code>、<code>1234-5678-9012-3456</code></td>
<td><code>1234567890123456</code>、<code>1234  5678  9012  3456</code>、<code>1234_5678_9012_3456</code></td>
</tr>
</tbody>
</table>

### IBAN验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>iban</code></td>
<td><code>/^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/</code></td>
<td>国际银行账号</td>
<td><code>GB82WEST12345698765432</code>、<code>DE89370400440532013000</code>、<code>FR1420041010050500013M02606</code></td>
<td><code>GB82WEST123456987654321</code>、<code>gb82west12345698765432</code>、<code>GB82-WEST-1234-5698-7654-32</code></td>
</tr>
</tbody>
</table>

### SWIFT验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>swift</code></td>
<td><code>/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/</code></td>
<td>SWIFT代码</td>
<td><code>DEUTDEFF</code>、<code>DEUTDEFF500</code>、<code>CHASUS33</code>、<code>MIDLGB22XXX</code></td>
<td><code>DEUTDEF</code>、<code>deutdeff</code>、<code>DEUTDEFF5000</code>、<code>DEUTD-FF</code></td>
</tr>
</tbody>
</table>

### 账户号验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>accountNumber</code></td>
<td><code>/^\d{16,19}$/</code></td>
<td>中国银行账号</td>
<td><code>6225757711234567</code>、<code>622575771123456789</code>、<code>62257577112345678901</code></td>
<td><code>622575771123456</code>、<code>6225757711234567890123</code>、<code>abcd1234567890123456</code></td>
</tr>
<tr>
<td><code>accountNumber:US</code></td>
<td><code>/^\d{8,12}$/</code></td>
<td>美国银行账号</td>
<td><code>12345678</code>、<code>123456789012</code>、<code>987654321</code></td>
<td><code>1234567</code>、<code>1234567890123</code>、<code>abcd12345678</code></td>
</tr>
</tbody>
</table>

### 货币和投资

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>currencyAmount</code></td>
<td><code>/^\d{1,3}(,\d{3})*(\.\d{2})?$/</code></td>
<td>通用货币金额格式（支持千分位）</td>
<td><code>1,234.56</code>、<code>123,456</code>、<code>1,000,000.00</code>、<code>999.99</code></td>
<td><code>1234,56</code>、<code>1,23.45</code>、<code>1,000,000.000</code>、<code>abc.123</code></td>
</tr>
<tr>
<td><code>currencyAmount:withSymbol</code></td>
<td><code>/^[¥$€£₹]?\d{1,3}(,\d{3})*(\.\d{2})?$/</code></td>
<td>带货币符号的金额格式</td>
<td><code>$1,234.56</code>、<code>¥123,456</code>、<code>€1,000.00</code>、<code>£999.99</code></td>
<td><code>$1234,56</code>、<code>¥1,23.45</code>、<code>€abc.123</code>、<code>#1,000.00</code></td>
</tr>
<tr>
<td><code>stockPrice</code></td>
<td><code>/^\d+(\.\d{1,4})?$/</code></td>
<td>股票价格格式（支持1-4位小数）</td>
<td><code>123.45</code>、<code>1000</code>、<code>99.9999</code>、<code>0.01</code></td>
<td><code>123.45678</code>、<code>-123.45</code>、<code>abc.123</code>、<code>123.</code></td>
</tr>
<tr>
<td><code>cryptoAddress:bitcoin</code></td>
<td><code>/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/</code></td>
<td>Bitcoin地址格式</td>
<td><code>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>、<code>3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</code></td>
<td><code>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfN</code>、<code>invalid-address</code>、<code>2A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code></td>
</tr>
<tr>
<td><code>cryptoAddress:ethereum</code></td>
<td><code>/^0x[a-fA-F0-9]{40}$/</code></td>
<td>Ethereum地址格式</td>
<td><code>0x742d35Cc6634C0532925a3b8D8Cc44Ce4Aa87C9D</code>、<code>0x0000000000000000000000000000000000000000</code></td>
<td><code>0x742d35Cc6634C0532925a3b8D8Cc44Ce4Aa87C</code>、<code>742d35Cc6634C0532925a3b8D8Cc44Ce4Aa87C9D</code></td>
</tr>
</tbody>
</table>

---

## 格式验证 (Format)

### 数字格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>number</code></td>
<td><code>/^-?\d+$/</code></td>
<td>整数（包括负数）</td>
<td><code>123</code>、<code>-456</code>、<code>0</code>、<code>999999</code></td>
<td><code>123.45</code>、<code>abc</code>、<code>12.</code>、<code>1.0</code></td>
</tr>
<tr>
<td><code>number:positive</code></td>
<td><code>/^[1-9]\d*$/</code></td>
<td>正整数（不包括0）</td>
<td><code>123</code>、<code>999</code>、<code>1</code></td>
<td><code>-123</code>、<code>0</code>、<code>12.5</code>、<code>abc</code></td>
</tr>
<tr>
<td><code>number:decimal</code></td>
<td><code>/^-?\d+\.\d+$/</code></td>
<td>小数（包括负数）</td>
<td><code>123.45</code>、<code>-67.89</code>、<code>0.1</code>、<code>999.999</code></td>
<td><code>123</code>、<code>12.</code>、<code>.5</code>、<code>abc</code></td>
</tr>
<tr>
<td><code>number:positive_decimal</code></td>
<td><code>/^\d+\.\d+$/</code></td>
<td>正小数</td>
<td><code>123.45</code>、<code>0.1</code>、<code>999.999</code></td>
<td><code>-67.89</code>、<code>123</code>、<code>12.</code>、<code>.5</code></td>
</tr>
<tr>
<td><code>number:percentage</code></td>
<td><code>/^-?\d+(\.\d+)?%$/</code></td>
<td>百分比格式</td>
<td><code>50%</code>、<code>100%</code>、<code>0.5%</code>、<code>-25%</code></td>
<td><code>50</code>、<code>100 %</code>、<code>%50</code>、<code>abc%</code></td>
</tr>
<tr>
<td><code>number:currency</code></td>
<td><code>/^-?\$?\d{1,3}(,\d{3})*(\.\d{2})?$/</code></td>
<td>货币格式（美元）</td>
<td><code>$1,234.56</code>、<code>1,234</code>、<code>$0.99</code>、<code>-$500.00</code></td>
<td><code>$1234.567</code>、<code>1,23</code>、<code>$1,2345</code>、<code>$abc</code></td>
</tr>
</tbody>
</table>

### 日期格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>date</code></td>
<td><code>/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/</code></td>
<td>ISO标准日期格式</td>
<td><code>2024-01-01</code>、<code>2023-12-31</code>、<code>2024-02-29</code></td>
<td><code>2024-13-01</code>、<code>2024-01-32</code>、<code>24-01-01</code>、<code>2024/01/01</code></td>
</tr>
<tr>
<td><code>date:DD/MM/YYYY</code></td>
<td><code>/^((0[1-9])|([1-2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/\d{4}$/</code></td>
<td>欧洲日期格式</td>
<td><code>01/01/2024</code>、<code>31/12/2023</code>、<code>29/02/2024</code></td>
<td><code>32/01/2024</code>、<code>01/13/2024</code>、<code>1/1/2024</code>、<code>01-01-2024</code></td>
</tr>
<tr>
<td><code>date:MM/DD/YYYY</code></td>
<td><code>/^((0[1-9])|(1[0-2]))\/((0[1-9])|([1-2][0-9])|(3[0-1]))\/\d{4}$/</code></td>
<td>美式日期格式</td>
<td><code>01/01/2024</code>、<code>12/31/2023</code>、<code>02/29/2024</code></td>
<td><code>13/01/2024</code>、<code>01/32/2024</code>、<code>1/1/2024</code>、<code>01-01-2024</code></td>
</tr>
<tr>
<td><code>date:iso</code></td>
<td><code>/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/</code></td>
<td>ISO8601日期时间格式</td>
<td><code>2024-01-01T12:00:00</code>、<code>2024-01-01T12:00:00.123Z</code>、<code>2023-12-31T23:59:59</code></td>
<td><code>2024-01-01 12:00:00</code>、<code>2024/01/01T12:00:00</code>、<code>2024-01-01T25:00:00</code></td>
</tr>
</tbody>
</table>

### 时间格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>time</code></td>
<td><code>/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/</code></td>
<td>24小时制时间格式</td>
<td><code>12:30</code>、<code>23:59</code>、<code>00:00</code>、<code>12:30:45</code></td>
<td><code>24:00</code>、<code>12:60</code>、<code>12:30:60</code>、<code>12-30</code></td>
</tr>
<tr>
<td><code>time:12h</code></td>
<td><code>/^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?\s?(AM|PM|am|pm)$/</code></td>
<td>12小时制时间格式</td>
<td><code>12:30 PM</code>、<code>11:59 AM</code>、<code>1:00 pm</code>、<code>12:30:45 AM</code></td>
<td><code>13:30 PM</code>、<code>12:60 AM</code>、<code>00:30 PM</code>、<code>12:30</code></td>
</tr>
</tbody>
</table>

### 颜色格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>color</code></td>
<td><code>/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/</code></td>
<td>十六进制颜色值</td>
<td><code>#FF0000</code>、<code>#00ff00</code>、<code>#0000FF</code>、<code>#fff</code>、<code>#000</code></td>
<td><code>FF0000</code>、<code>#GG0000</code>、<code>#12345</code>、<code>#1234567</code>、<code>red</code></td>
</tr>
<tr>
<td><code>color:rgb</code></td>
<td><code>/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/</code></td>
<td>RGB颜色值</td>
<td><code>rgb(255,0,0)</code>、<code>rgb(0, 255, 0)</code>、<code>rgb(0,  0,  255)</code>、<code>rgb(128,128,128)</code>、<code>rgb(0,0,0)</code></td>
<td><code>rgb(256,0,0)</code>、<code>rgb(255,0)</code>、<code>rgba(255,0,0,0.5)</code>、<code>#FF0000</code>、<code>rgb(-1,0,0)</code></td>
</tr>
<tr>
<td><code>color:rgba</code></td>
<td><code>/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/</code></td>
<td>RGBA颜色值（带透明度）</td>
<td><code>rgba(255,0,0,0.5)</code>、<code>rgba(0, 255, 0, 1)</code>、<code>rgba(0,0,255,0)</code></td>
<td><code>rgba(256,0,0,0.5)</code>、<code>rgba(255,0,0)</code>、<code>rgba(255,0,0,1.5)</code></td>
</tr>
<tr>
<td><code>color:hsl</code></td>
<td><code>/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/</code></td>
<td>HSL颜色值</td>
<td><code>hsl(120,100%,50%)</code>、<code>hsl(0, 0%, 0%)</code>、<code>hsl(360, 100%, 100%)</code></td>
<td><code>hsl(361,100%,50%)</code>、<code>hsl(120,101%,50%)</code>、<code>hsl(120,100,50)</code></td>
</tr>
<tr>
<td><code>hexColor</code></td>
<td><code>/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/</code></td>
<td>十六进制颜色值</td>
<td><code>#FF0000</code>、<code>#00ff00</code>、<code>#0000FF</code>、<code>#fff</code>、<code>#000</code></td>
<td><code>FF0000</code>、<code>#GG0000</code>、<code>#12345</code>、<code>#1234567</code>、<code>red</code></td>
</tr>
</tbody>
</table>

### 坐标格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>coordinate</code></td>
<td><code>/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/</code></td>
<td>十进制经纬度坐标</td>
<td><code>40.7128,-74.0060</code>、<code>0,0</code>、<code>-90.0,180.0</code>、<code>39.9042,116.4074</code></td>
<td><code>40.7128</code>、<code>40.7128,-74.0060,123</code>、<code>abc,def</code>、<code>40.7128, -74.0060</code></td>
</tr>
<tr>
<td><code>coordinate:dms</code></td>
<td><code>/^\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?"[NS],\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?"[EW]$/</code></td>
<td>度分秒格式坐标</td>
<td><code>40°42'46"N,74°0'21"W</code>、<code>0°0'0"N,0°0'0"E</code></td>
<td><code>40°42'46"N</code>、<code>40°42'46"N,74°0'21"</code>、<code>40°42'46",74°0'21"</code></td>
</tr>
</tbody>
</table>

### 文件和格式验证

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>fileExtension</code></td>
<td><code>/^\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar|mp4|mp3|avi)$/i</code></td>
<td>常见文件扩展名</td>
<td><code>.jpg</code>、<code>.PDF</code>、<code>.docx</code>、<code>.mp4</code>、<code>.txt</code>、<code>.zip</code></td>
<td><code>.</code>、<code>jpg</code>、<code>.exe</code>、<code>.unknown</code>、<code>.js.map</code></td>
</tr>
<tr>
<td><code>fileExtension:image</code></td>
<td><code>/^\.(jpg|jpeg|png|gif|bmp|webp|svg|ico)$/i</code></td>
<td>图片文件扩展名</td>
<td><code>.jpg</code>、<code>.PNG</code>、<code>.gif</code>、<code>.svg</code>、<code>.webp</code></td>
<td><code>.pdf</code>、<code>.doc</code>、<code>.mp4</code>、<code>.txt</code></td>
</tr>
<tr>
<td><code>httpStatus</code></td>
<td><code>/^[1-5]\d{2}$/</code></td>
<td>HTTP状态码（100-599）</td>
<td><code>200</code>、<code>404</code>、<code>500</code>、<code>301</code>、<code>403</code></td>
<td><code>99</code>、<code>600</code>、<code>1000</code>、<code>abc</code>、<code>20</code></td>
</tr>
<tr>
<td><code>timezone:offset</code></td>
<td><code>/^UTC[+-]([0-9]|1[0-2])(:30)?$|^UTC$/</code></td>
<td>UTC时区偏移格式</td>
<td><code>UTC</code>、<code>UTC+8</code>、<code>UTC-5</code>、<code>UTC+9:30</code>、<code>UTC-12</code></td>
<td><code>UTC+15</code>、<code>UTC-13</code>、<code>GMT+8</code>、<code>UTC+8:45</code></td>
</tr>
<tr>
<td><code>languageCode</code></td>
<td><code>/^[a-z]{2}(-[A-Z]{2})?$/</code></td>
<td>ISO 639语言代码（可含国家代码）</td>
<td><code>en</code>、<code>zh-CN</code>、<code>ja-JP</code>、<code>fr-FR</code>、<code>es</code></td>
<td><code>ENG</code>、<code>zh_CN</code>、<code>chinese</code>、<code>en-us</code>、<code>123</code></td>
</tr>
</tbody>
</table>

### 温度和测量

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>temperature</code></td>
<td><code>/^-?\d+(\.\d+)?°?C$/i</code></td>
<td>温度格式</td>
<td><code>25°C</code>、<code>-10.5°C</code>、<code>98.6°F</code>、<code>0°C</code></td>
<td><code>25C</code>、<code>25°</code>、<code>25°K</code>、<code>abc°C</code></td>
</tr>
<tr>
<td><code>measurement</code></td>
<td><code>/^\d+(\.\d+)?\s?(mm|cm|m|km|in|ft|yd|mi)$/</code></td>
<td>长度测量单位</td>
<td><code>10mm</code>、<code>5.5cm</code>、<code>100 m</code>、<code>1.5 km</code></td>
<td><code>10</code>、<code>5.5 cm2</code>、<code>abc mm</code>、<code>10 meter</code></td>
</tr>
</tbody>
</table>

---

## 商务验证 (Business)

### 营业执照

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>businessLicense</code></td>
<td><code>/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/</code></td>
<td>中国营业执照号</td>
<td><code>91110000000000000X</code>、<code>91110000000000001A</code>、<code>91110000000000002B</code>、<code>91110000000000003C</code></td>
<td><code>9111000000000000</code>、<code>91110000000000000XI</code>、<code>G1110000000000000X</code>、<code>91110000000000000</code>、<code>911100000000000001</code></td>
</tr>
</tbody>
</table>

### 税务登记号

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>taxId</code></td>
<td><code>/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/</code></td>
<td>中国税务登记号</td>
<td><code>91110000000000000X</code>、<code>91110000000000001A</code>、<code>91110000000000002B</code>、<code>91110000000000003C</code></td>
<td><code>9111000000000000</code>、<code>91110000000000000XI</code>、<code>G1110000000000000X</code>、<code>91110000000000000</code>、<code>911100000000000001</code></td>
</tr>
<tr>
<td><code>taxId:US</code></td>
<td><code>/^\d{2}-\d{7}$/</code></td>
<td>美国税号（EIN）</td>
<td><code>12-3456789</code>、<code>98-7654321</code>、<code>45-1234567</code>、<code>77-9876543</code></td>
<td><code>123456789</code>、<code>12-345678</code>、<code>12-34567890</code>、<code>1-2345678</code>、<code>123-456789</code></td>
</tr>
</tbody>
</table>

### 组织机构代码

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>organizationCode</code></td>
<td><code>/^[A-Z0-9]{8}-[A-Z0-9]$/</code></td>
<td>中国组织机构代码</td>
<td><code>12345678-X</code>、<code>ABCD1234-5</code></td>
<td><code>12345678</code>、<code>12345678-</code>、<code>12345678-XY</code></td>
</tr>
</tbody>
</table>

### 发票号码

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>invoice</code></td>
<td><code>/^\d{8,12}$/</code></td>
<td>中国发票号码</td>
<td><code>12345678</code>、<code>123456789012</code>、<code>987654321</code></td>
<td><code>1234567</code>、<code>1234567890123</code>、<code>abc12345678</code></td>
</tr>
</tbody>
</table>

### 公司名称

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>companyName</code></td>
<td><code>/^.{2,100}$/</code></td>
<td>标准公司名称格式</td>
<td><code>Apple Inc.</code>、<code>北京科技有限公司</code>、<code>Google LLC</code></td>
<td><code>A</code>、<code></code></td>
</tr>
<tr>
<td><code>companyName:strict</code></td>
<td><code>/^[a-zA-Z0-9\u4e00-\u9fa5\s\.,&()-]{2,100}$/</code></td>
<td>严格公司名称格式</td>
<td><code>Apple Inc.</code>、<code>北京科技有限公司</code>、<code>AT&T Corp.</code></td>
<td><code>Company@Name</code>、<code>公司#名称</code>、<code>A</code></td>
</tr>
</tbody>
</table>

### 股票代码

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>stockCode</code></td>
<td><code>/^(00|30|60|68)\d{4}$/</code></td>
<td>中国股票代码</td>
<td><code>000001</code>、<code>300001</code>、<code>600001</code>、<code>688001</code></td>
<td><code>123456</code>、<code>700001</code>、<code>00001</code>、<code>0000001</code></td>
</tr>
<tr>
<td><code>stockCode:US</code></td>
<td><code>/^[A-Z]{1,5}$/</code></td>
<td>美国股票代码</td>
<td><code>AAPL</code>、<code>GOOGL</code>、<code>MSFT</code>、<code>TSLA</code>、<code>A</code></td>
<td><code>aapl</code>、<code>AAAAAA</code>、<code>123ABC</code>、<code>A1</code></td>
</tr>
<tr>
<td><code>stockCode:HK</code></td>
<td><code>/^\d{4,5}$/</code></td>
<td>香港股票代码</td>
<td><code>0001</code>、<code>00700</code>、<code>09988</code>、<code>03690</code></td>
<td><code>1</code>、<code>123</code>、<code>123456</code>、<code>A001</code></td>
</tr>
</tbody>
</table>

### 员工工号

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>employeeId</code></td>
<td><code>/^EMP\d{6}$/</code></td>
<td>标准员工工号：EMP + 6位数字</td>
<td><code>EMP123456</code>、<code>EMP000001</code>、<code>EMP999999</code></td>
<td><code>emp123456</code>、<code>EMP12345</code>、<code>EMP1234567</code>、<code>123456</code></td>
</tr>
<tr>
<td><code>employeeId:legacy</code></td>
<td><code>/^[A-Z]{2}\d{4}$/</code></td>
<td>旧版员工工号：2个大写字母 + 4位数字</td>
<td><code>AB1234</code>、<code>XY9999</code>、<code>AA0001</code></td>
<td><code>ab1234</code>、<code>A1234</code>、<code>ABC123</code>、<code>AB12345</code></td>
</tr>
</tbody>
</table>

---

## 社交平台 (Social)

### 中国社交平台

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>qq</code></td>
<td><code>/^[1-9][0-9]{4,10}$/</code></td>
<td>QQ号码</td>
<td><code>12345</code>、<code>123456789</code>、<code>1234567890</code></td>
<td><code>1234</code>、<code>01234567890</code>、<code>abc12345</code>、<code>12345678901</code></td>
</tr>
<tr>
<td><code>wechat</code></td>
<td><code>/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/</code></td>
<td>微信号</td>
<td><code>wxid_abc123</code>、<code>user_name123</code>、<code>test-user</code></td>
<td><code>123abc</code>、<code>a</code>、<code>user@name</code>、<code>user name</code></td>
</tr>
<tr>
<td><code>weibo</code></td>
<td><code>/^[a-zA-Z0-9_-]{4,30}$/</code></td>
<td>微博用户名</td>
<td><code>user123</code>、<code>test_user</code>、<code>my-weibo</code></td>
<td><code>usr</code>、<code>user@name</code>、<code>user name</code>、<code>123456789012345678901234567890123</code></td>
</tr>
<tr>
<td><code>douyin</code></td>
<td><code>/^[a-zA-Z0-9._-]{1,24}$/</code></td>
<td>抖音号</td>
<td><code>user123</code>、<code>test.user</code>、<code>my_douyin</code>、<code>a</code></td>
<td><code>user@name</code>、<code>user name</code>、<code>12345678901234567890123456</code></td>
</tr>
</tbody>
</table>

### 国际社交平台

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>linkedin</code></td>
<td><code>/^[a-zA-Z0-9-]{3,100}$/</code></td>
<td>LinkedIn用户名</td>
<td><code>john-doe</code>、<code>user123</code>、<code>my-profile</code></td>
<td><code>jo</code>、<code>user_name</code>、<code>user@name</code>、<code>user.name</code></td>
</tr>
<tr>
<td><code>twitter</code></td>
<td><code>/^[a-zA-Z0-9_]{1,15}$/</code></td>
<td>Twitter用户名</td>
<td><code>user123</code>、<code>test_user</code>、<code>a</code></td>
<td><code>user-name</code>、<code>user@name</code>、<code>1234567890123456</code></td>
</tr>
<tr>
<td><code>instagram</code></td>
<td><code>/^[a-zA-Z0-9._]{1,30}$/</code></td>
<td>Instagram用户名</td>
<td><code>user123</code>、<code>test.user</code>、<code>my_insta</code></td>
<td><code>user-name</code>、<code>user@name</code>、<code>1234567890123456789012345678901</code></td>
</tr>
<tr>
<td><code>facebook</code></td>
<td><code>/^[a-zA-Z0-9.]{5,50}$/</code></td>
<td>Facebook用户名</td>
<td><code>john.doe</code>、<code>user123</code>、<code>test.user</code></td>
<td><code>user</code>、<code>user-name</code>、<code>user@name</code>、<code>12345678901234567890123456789012345678901234567890123</code></td>
</tr>
</tbody>
</table>

### YouTube

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>youtube</code></td>
<td><code>/^UC[a-zA-Z0-9_-]{22}$/</code></td>
<td>YouTube频道ID</td>
<td><code>UCuAXFkgsw1L7xaCfnd5JJOw</code>、<code>UC1234567890123456789012</code></td>
<td><code>UC123</code>、<code>YC1234567890123456789012</code>、<code>UCuAXFkgsw1L7xaCfnd5JJOwX</code></td>
</tr>
<tr>
<td><code>youtube:handle</code></td>
<td><code>/^@[a-zA-Z0-9._-]{3,30}$/</code></td>
<td>YouTube用户名</td>
<td><code>@username</code>、<code>@test.user</code>、<code>@my_channel</code></td>
<td><code>username</code>、<code>@us</code>、<code>@user@name</code>、<code>@12345678901234567890123456789012</code></td>
</tr>
</tbody>
</table>

### GitHub

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>github</code></td>
<td><code>/^[a-zA-Z0-9]([a-zA-Z0-9-]){0,38}$/</code></td>
<td>GitHub用户名</td>
<td><code>username</code>、<code>test-user</code>、<code>user123</code></td>
<td><code>-username</code>、<code>user-</code>、<code>1234567890123456789012345678901234567890</code></td>
</tr>
<tr>
<td><code>github:repo</code></td>
<td><code>/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/</code></td>
<td>GitHub仓库名</td>
<td><code>user/repo</code>、<code>test-user/my-project</code>、<code>org/awesome.tool</code></td>
<td><code>user</code>、<code>user/</code>、<code>/repo</code>、<code>user repo/test</code></td>
</tr>
</tbody>
</table>

---

## 技术相关 (Tech)

### 版本号

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>version</code></td>
<td><code>/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/</code></td>
<td>语义化版本号（主版本.次版本.修订版本）</td>
<td><code>1.0.0</code>、<code>2.1.3</code>、<code>1.0.0-alpha</code>、<code>1.0.0-alpha.1</code>、<code>1.0.0+20130313144700</code></td>
<td><code>1.0</code>、<code>1.0.0.0</code>、<code>v1.0.0</code>、<code>1.0.0-</code>、<code>1.0.0+</code></td>
</tr>
<tr>
<td><code>version:simple</code></td>
<td><code>/^v?\d+(\.\d+)*$/</code></td>
<td>简单版本号格式（可带v前缀）</td>
<td><code>1.0</code>、<code>2.1.3</code>、<code>v1.0.0</code>、<code>1.2.3.4</code></td>
<td><code>1.0.0-alpha</code>、<code>version</code>、<code>1.0.</code>、<code>.1.0</code></td>
</tr>
</tbody>
</table>

### UUID

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>uuid</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i</code></td>
<td>UUID第4版（随机生成）</td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>、<code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code></td>
<td><code>550e8400-e29b-41d4-a716</code>、<code>invalid-uuid</code>、<code>550e8400e29b41d4a716446655440000</code></td>
</tr>
<tr>
<td><code>uuid:v1</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i</code></td>
<td>UUID第1版（基于时间和MAC地址）</td>
<td><code>550e8400-e29b-11d4-a716-446655440000</code></td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>、<code>invalid-uuid</code></td>
</tr>
<tr>
<td><code>uuid:any</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i</code></td>
<td>任意UUID格式（不限制版本）</td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>、<code>550e8400-e29b-11d4-a716-446655440000</code></td>
<td><code>550e8400-e29b-41d4-a716</code>、<code>invalid-uuid</code></td>
</tr>
</tbody>
</table>

### MAC地址

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mac</code></td>
<td><code>/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/</code></td>
<td>MAC地址（冒号或连字符分隔）</td>
<td><code>00:1B:44:11:3A:B7</code>、<code>00-1B-44-11-3A-B7</code>、<code>FF:FF:FF:FF:FF:FF</code></td>
<td><code>00:1B:44:11:3A</code>、<code>00:1B:44:11:3A:B7:C8</code>、<code>GG:1B:44:11:3A:B7</code></td>
</tr>
<tr>
<td><code>mac:dot</code></td>
<td><code>/^([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4}$/</code></td>
<td>MAC地址（点分隔格式）</td>
<td><code>001B.4411.3AB7</code>、<code>FFFF.FFFF.FFFF</code></td>
<td><code>00:1B:44:11:3A:B7</code>、<code>001B.4411.3AB</code>、<code>001B.4411.3AB7.C8</code></td>
</tr>
<tr>
<td><code>mac:plain</code></td>
<td><code>/^[0-9A-Fa-f]{12}$/</code></td>
<td>MAC地址（无分隔符格式）</td>
<td><code>001B44113AB7</code>、<code>FFFFFFFFFFFF</code></td>
<td><code>001B:44:11:3A:B7</code>、<code>001B44113AB</code>、<code>001B44113AB7C8</code></td>
</tr>
</tbody>
</table>

### 其他技术格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>slug</code></td>
<td><code>/^[a-z0-9]+(?:-[a-z0-9]+)*$/</code></td>
<td>URL slug格式（连字符分隔）</td>
<td><code>hello-world</code>、<code>my-blog-post</code>、<code>test123</code></td>
<td><code>Hello-World</code>、<code>hello_world</code>、<code>hello-world-</code>、<code>-hello-world</code></td>
</tr>
<tr>
<td><code>slug:underscore</code></td>
<td><code>/^[a-z0-9]+(?:_[a-z0-9]+)*$/</code></td>
<td>URL slug格式（下划线分隔）</td>
<td><code>hello_world</code>、<code>my_blog_post</code>、<code>test123</code></td>
<td><code>Hello_World</code>、<code>hello-world</code>、<code>hello_world_</code>、<code>_hello_world</code></td>
</tr>
<tr>
<td><code>filename</code></td>
<td><code>/^[^<>:"/\\\\|?*\\x00-\\x1f]+$/</code></td>
<td>标准文件名（禁止系统保留字符）</td>
<td><code>document.pdf</code>、<code>my file.txt</code>、<code>测试文档.docx</code></td>
<td><code>file&lt;name.txt</code>、<code>file&gt;name.txt</code>、<code>file:name.txt</code>、<code>file|name.txt</code></td>
</tr>
<tr>
<td><code>filename:strict</code></td>
<td><code>/^[a-zA-Z0-9._-]+$/</code></td>
<td>严格文件名（仅字母数字和部分符号）</td>
<td><code>document.pdf</code>、<code>my-file.txt</code>、<code>test_123.jpg</code></td>
<td><code>file name.txt</code>、<code>file@name.txt</code>、<code>文件.txt</code></td>
</tr>
<tr>
<td><code>base64</code></td>
<td><code>/^[A-Za-z0-9+/]*={0,2}$/</code></td>
<td>Base64编码格式</td>
<td><code>SGVsbG8gV29ybGQ=</code>、<code>dGVzdA==</code>、<code>YWJjZGVmZw</code></td>
<td><code>SGVsbG8gV29ybGQ===</code>、<code>invalid base64!</code>、<code>SGVsbG8@V29ybGQ=</code></td>
</tr>
<tr>
<td><code>json</code></td>
<td><code>/^\s*[\[{].*[\]}]\s*$/s</code></td>
<td>JSON格式验证</td>
<td><code>{"key":"value"}</code>、<code>[1,2,3]</code>、<code>{"nested":{"data":true}}</code></td>
<td><code>{key:value}</code>、<code>invalid json</code>、<code>{"key":"value",}</code></td>
</tr>
<tr>
<td><code>htmlTag</code></td>
<td><code>/^&lt;[a-zA-Z][a-zA-Z0-9]*\b[^&gt;]*&gt;.*?&lt;\/[a-zA-Z][a-zA-Z0-9]*&gt;$/s</code></td>
<td>HTML标签格式</td>
<td><code>&lt;div&gt;content&lt;/div&gt;</code>、<code>&lt;p class="text"&gt;hello&lt;/p&gt;</code></td>
<td><code>&lt;div&gt;content</code>、<code>div&gt;content&lt;/div&gt;</code>、<code>&lt;123&gt;invalid&lt;/123&gt;</code></td>
</tr>
<tr>
<td><code>xpath</code></td>
<td><code>/^\/(?:[a-zA-Z_][\w-]*(?:\[[^\]]*\])?(?:\/[a-zA-Z_][\w-]*(?:\[[^\]]*\])?)*)?$/</code></td>
<td>XPath表达式</td>
<td><code>/html/body/div</code>、<code>//div[@class='content']</code>、<code>//*[@id='main']</code></td>
<td><code>html/body/div</code>、<code>/html//body</code>、<code>/123invalid</code></td>
</tr>
<tr>
<td><code>cssSelector</code></td>
<td><code>/^[a-zA-Z#.][\w\s#.,:()[\]"'-]*$/</code></td>
<td>CSS选择器</td>
<td><code>.class</code>、<code>#id</code>、<code>div.class</code>、<code>input[type="text"]</code></td>
<td><code>123invalid</code>、<code>.class{}</code>、<code>div &gt; p</code></td>
</tr>
<tr>
<td><code>regex</code></td>
<td><code>/^\/.*\/[gimuy]*$/</code></td>
<td>正则表达式格式</td>
<td><code>/test/gi</code>、<code>/[a-z]+/</code>、<code>/^hello$/i</code></td>
<td><code>test</code>、<code>/test</code>、<code>test/</code>、<code>/test/xyz</code></td>
</tr>
<tr>
<td><code>cronExpression</code></td>
<td><code>/^(\*|[0-5]?\d)(\s+(\*|[0-5]?\d)){4}$/</code></td>
<td>Cron表达式</td>
<td><code>0 0 * * *</code>、<code>30 2 * * 1</code>、<code>0 */4 * * *</code></td>
<td><code>0 0 * *</code>、<code>60 0 * * *</code>、<code>0 0 32 * *</code></td>
</tr>
<tr>
<td><code>dockerImage</code></td>
<td><code>/^[a-z0-9]+(?:[._-][a-z0-9]+)*(?:\/[a-z0-9]+(?:[._-][a-z0-9]+)*)*(?::[a-zA-Z0-9._-]+)?$/</code></td>
<td>Docker镜像名称</td>
<td><code>nginx</code>、<code>node:16</code>、<code>registry.com/user/app:latest</code></td>
<td><code>NGINX</code>、<code>node:</code>、<code>registry/user/app:</code></td>
</tr>
<tr>
<td><code>sqlQuery</code></td>
<td><code>/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/i</code></td>
<td>SQL查询语句</td>
<td><code>SELECT * FROM users</code>、<code>INSERT INTO table VALUES</code>、<code>UPDATE users SET name</code></td>
<td><code>SHOW TABLES</code>、<code>DESCRIBE table</code>、<code>invalid query</code></td>
</tr>
</tbody>
</table>

---

## 安全相关 (Security)

### 密码强度

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>password</code></td>
<td><code>/^.{6,}$/</code></td>
<td>基本密码强度（至少6位）</td>
<td><code>password123</code>、<code>myPass456</code>、<code>123456</code></td>
<td><code>123</code>、<code>pass</code>、<code>12345</code></td>
</tr>
<tr>
<td><code>password:medium</code></td>
<td><code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/</code></td>
<td>中等密码强度（大小写字母+数字，8位+）</td>
<td><code>Password123</code>、<code>MyPass456</code>、<code>Abc12345</code></td>
<td><code>password123</code>、<code>PASSWORD123</code>、<code>12345678</code>、<code>Password</code></td>
</tr>
<tr>
<td><code>password:strong</code></td>
<td><code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/</code></td>
<td>强密码强度（大小写+数字+特殊字符，8位+）</td>
<td><code>MyPass123!</code>、<code>Secure@2024</code>、<code>Strong$Pass1</code></td>
<td><code>password</code>、<code>12345678</code>、<code>PASSWORD</code>、<code>MyPass123</code></td>
</tr>
<tr>
<td><code>password:complex</code></td>
<td><code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[^a-zA-Z\d@$!%*?&]).{12,}$/</code></td>
<td>复杂密码强度（包含所有类型字符，12位+）</td>
<td><code>MyPass123!#Complex</code>、<code>Secure@2024~Strong</code>、<code>Strong$Pass1#Extra</code>、<code>Complex&Pass123~</code></td>
<td><code>MyPass123!</code>、<code>Secure@2024</code>、<code>password123</code>、<code>SHORT!1#</code>、<code>NoSpecial123</code></td>
</tr>
</tbody>
</table>

### API密钥

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>apiKey</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i</code></td>
<td>UUID格式API密钥</td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>、<code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code></td>
<td><code>550e8400-e29b-41d4-a716</code>、<code>invalid-uuid</code>、<code>550e8400e29b41d4a716446655440000</code></td>
</tr>
<tr>
<td><code>apiKey:hex32</code></td>
<td><code>/^[a-f0-9]{32}$/i</code></td>
<td>32位十六进制API密钥</td>
<td><code>5d41402abc4b2a76b9719d911017c592</code>、<code>098f6bcd4621d373cade4e832627b4f6</code></td>
<td><code>5d41402abc4b2a76b9719d911017c59</code>、<code>5d41402abc4b2a76b9719d911017c5921</code>、<code>GH41402abc4b2a76b9719d911017c592</code></td>
</tr>
<tr>
<td><code>apiKey:base64</code></td>
<td><code>/^[A-Za-z0-9+/]{32,}={0,2}$/</code></td>
<td>Base64格式API密钥</td>
<td><code>SGVsbG8gV29ybGQhIFRoaXMgaXMgYSB0ZXN0</code>、<code>dGVzdCBhcGkga2V5IGZvciBkZW1vbnN0cmF0aW9u</code></td>
<td><code>SGVsbG8=</code>、<code>invalid base64!</code>、<code>SGVsbG8gV29ybGQ===</code></td>
</tr>
</tbody>
</table>

### 令牌格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>token</code></td>
<td><code>/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/</code></td>
<td>JWT令牌格式（三部分结构）</td>
<td><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></td>
<td><code>invalid.jwt</code>、<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</code>、<code>token</code></td>
</tr>
<tr>
<td><code>token:bearer</code></td>
<td><code>/^Bearer\s[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/</code></td>
<td>Bearer令牌格式（HTTP授权头）</td>
<td><code>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></td>
<td><code>bearer token</code>、<code>Bearer token</code>、<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></td>
</tr>
</tbody>
</table>

### 哈希值

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>hash</code></td>
<td><code>/^[a-f0-9]{32}$/i</code></td>
<td>MD5哈希值（32位十六进制）</td>
<td><code>5d41402abc4b2a76b9719d911017c592</code>、<code>098f6bcd4621d373cade4e832627b4f6</code></td>
<td><code>5d41402abc4b2a76b9719d911017c59</code>、<code>5d41402abc4b2a76b9719d911017c5921</code>、<code>GH41402abc4b2a76b9719d911017c592</code></td>
</tr>
<tr>
<td><code>hash:sha1</code></td>
<td><code>/^[a-f0-9]{40}$/i</code></td>
<td>SHA1哈希值（40位十六进制）</td>
<td><code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d</code>、<code>da39a3ee5e6b4b0d3255bfef95601890afd80709</code></td>
<td><code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434</code>、<code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d1</code>、<code>GHf4c61ddcc5e8a2dabede0f3b482cd9aea9434d</code></td>
</tr>
<tr>
<td><code>hash:sha256</code></td>
<td><code>/^[a-f0-9]{64}$/i</code></td>
<td>SHA256哈希值（64位十六进制）</td>
<td><code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>、<code>2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae</code></td>
<td><code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85</code>、<code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8551</code>、<code>GHb0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></td>
</tr>
<tr>
<td><code>hash:sha512</code></td>
<td><code>/^[a-f0-9]{128}$/i</code></td>
<td>SHA512哈希值（128位十六进制）</td>
<td><code>cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e</code></td>
<td><code>cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3</code>、<code>cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e1</code></td>
</tr>
</tbody>
</table>

---

## 地理位置 (Location)

### 邮政编码

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>zipCode</code></td>
<td><code>/^[1-9]\d{5}$/</code></td>
<td>中国邮政编码</td>
<td><code>100000</code>、<code>200000</code>、<code>518000</code></td>
<td><code>000000</code>、<code>12345</code>、<code>1234567</code>、<code>abc123</code></td>
</tr>
<tr>
<td><code>zipCode:US</code></td>
<td><code>/^\d{5}(-\d{4})?$/</code></td>
<td>美国邮政编码</td>
<td><code>12345</code>、<code>12345-6789</code>、<code>90210</code></td>
<td><code>1234</code>、<code>123456</code>、<code>12345-678</code>、<code>abcde</code></td>
</tr>
<tr>
<td><code>zipCode:UK</code></td>
<td><code>/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i</code></td>
<td>英国邮政编码格式</td>
<td><code>M1 1AA</code>、<code>B33 8TH</code>、<code>W1A 0AX</code>、<code>EC1A 1BB</code>、<code>SW1A 1AA</code></td>
<td><code>M1</code>、<code>1AA</code>、<code>M1 1AAA</code>、<code>Z99 9ZZ</code>、<code>123 456</code></td>
</tr>
</tbody>
</table>

### 地址信息

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>address</code></td>
<td><code>/^.{5,100}$/</code></td>
<td>地址格式</td>
<td><code>北京市朝阳区建国路1号</code>、<code>123 Main St, New York</code></td>
<td><code>短地址</code>、<code></code></td>
</tr>
<tr>
<td><code>city</code></td>
<td><code>/^[a-zA-Z\u4e00-\u9fa5\s\-']{2,50}$/</code></td>
<td>城市名称</td>
<td><code>北京</code>、<code>New York</code>、<code>San Francisco</code>、<code>Xi'an</code></td>
<td><code>A</code>、<code>City123</code>、<code>City@Name</code></td>
</tr>
<tr>
<td><code>country</code></td>
<td><code>/^[A-Z]{2}$/</code></td>
<td>国家代码（ISO 3166-1）</td>
<td><code>CN</code>、<code>US</code>、<code>UK</code>、<code>JP</code></td>
<td><code>cn</code>、<code>USA</code>、<code>CHN</code>、<code>123</code></td>
</tr>
<tr>
<td><code>state</code></td>
<td><code>/^[a-zA-Z\u4e00-\u9fa5\s\-']{2,50}$/</code></td>
<td>州/省份名称</td>
<td><code>北京市</code>、<code>California</code>、<code>New York</code></td>
<td><code>A</code>、<code>State123</code>、<code>State@Name</code></td>
</tr>
</tbody>
</table>

---

## 媒体相关 (Media)

### 图片资源

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>imageUrl</code></td>
<td><code>/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i</code></td>
<td>图片URL</td>
<td><code>https://example.com/image.jpg</code>、<code>http://site.com/pic.png?v=1</code></td>
<td><code>https://example.com/image.txt</code>、<code>image.jpg</code>、<code>ftp://site.com/pic.png</code></td>
</tr>
</tbody>
</table>

### 音频资源

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>audioUrl</code></td>
<td><code>/^https?:\/\/.+\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i</code></td>
<td>音频URL</td>
<td><code>https://example.com/music.mp3</code>、<code>http://site.com/sound.wav?v=1</code></td>
<td><code>https://example.com/music.txt</code>、<code>music.mp3</code>、<code>ftp://site.com/audio.wav</code></td>
</tr>
</tbody>
</table>

### 视频资源

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>videoUrl</code></td>
<td><code>/^https?:\/\/.+\.(mp4|avi|mov|wmv|flv|webm|mkv)(\?.*)?$/i</code></td>
<td>视频URL</td>
<td><code>https://example.com/video.mp4</code>、<code>http://site.com/movie.avi?v=1</code></td>
<td><code>https://example.com/video.txt</code>、<code>video.mp4</code>、<code>ftp://site.com/movie.avi</code></td>
</tr>
<tr>
<td><code>videoId</code></td>
<td><code>/^[a-zA-Z0-9_-]{11}$/</code></td>
<td>YouTube视频ID</td>
<td><code>dQw4w9WgXcQ</code>、<code>jNQXAC9IVRw</code>、<code>9bZkp7q19f0</code></td>
<td><code>dQw4w9WgXc</code>、<code>dQw4w9WgXcQ1</code>、<code>invalid@id</code></td>
</tr>
</tbody>
</table>

---

## 杂项 (Misc)

### 字符类型

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>emoji</code></td>
<td><code>/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2B50}-\u{2B55}]/u</code></td>
<td>Unicode表情符号</td>
<td><code>😀</code>、<code>🎉</code>、<code>🚀</code>、<code>🇨🇳</code>、<code>⭐</code>、<code>✅</code></td>
<td><code>abc</code>、<code>123</code>、<code>:)</code>、<code>(emoji)</code></td>
</tr>
<tr>
<td><code>chineseChar</code></td>
<td><code>/^[\u4e00-\u9fa5]+$/</code></td>
<td>中文字符</td>
<td><code>中文</code>、<code>汉字</code>、<code>测试</code>、<code>你好世界</code>、<code>北京大学</code></td>
<td><code>Chinese</code>、<code>中文123</code>、<code>test中文</code>、<code>中文abc</code>、<code>你好world</code></td>
</tr>
<tr>
<td><code>arabicChar</code></td>
<td><code>/^[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]+$/</code></td>
<td>阿拉伯文字符</td>
<td><code>العربية</code>、<code>مرحبا</code></td>
<td><code>العربيةabc</code>、<code>123العربية</code>、<code>arabic</code></td>
</tr>
<tr>
<td><code>japaneseChar</code></td>
<td><code>/^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+$/</code></td>
<td>日文字符</td>
<td><code>ひらがな</code>、<code>カタカナ</code>、<code>漢字</code></td>
<td><code>ひらがなabc</code>、<code>123ひらがな</code>、<code>japanese</code></td>
</tr>
<tr>
<td><code>koreanChar</code></td>
<td><code>/^[\uac00-\ud7af]+$/</code></td>
<td>韩文字符</td>
<td><code>한글</code>、<code>안녕하세요</code></td>
<td><code>한글abc</code>、<code>123한글</code>、<code>korean</code></td>
</tr>
<tr>
<td><code>russianChar</code></td>
<td><code>/^[\u0400-\u04ff]+$/</code></td>
<td>俄文字符</td>
<td><code>русский</code>、<code>привет</code></td>
<td><code>русскийabc</code>、<code>123русский</code>、<code>russian</code></td>
</tr>
</tbody>
</table>

### 标识码

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>barcode</code></td>
<td><code>/^\d{8,14}$/</code></td>
<td>条形码</td>
<td><code>12345678</code>、<code>1234567890123</code></td>
<td><code>1234567</code>、<code>123456789012345</code>、<code>abc12345678</code></td>
</tr>
<tr>
<td><code>isbn</code></td>
<td><code>/^(97[89])?\d{9}[\dX]$/</code></td>
<td>ISBN书号</td>
<td><code>9787111547426</code>、<code>123456789X</code>、<code>1234567890</code></td>
<td><code>123456789</code>、<code>97812345678901</code>、<code>abc123456789</code></td>
</tr>
<tr>
<td><code>imei</code></td>
<td><code>/^\d{15}$/</code></td>
<td>手机IMEI号</td>
<td><code>123456789012345</code>、<code>987654321098765</code></td>
<td><code>12345678901234</code>、<code>1234567890123456</code>、<code>abc123456789012</code></td>
</tr>
<tr>
<td><code>license</code></td>
<td><code>/^[A-Z0-9]{8,32}$/</code></td>
<td>许可证号</td>
<td><code>ABC12345</code>、<code>LICENSE123456789</code></td>
<td><code>abc123</code>、<code>LICENSE@123</code>、<code>AB</code></td>
</tr>
<tr>
<td><code>lottery</code></td>
<td><code>/^\d{2}\+\d{2}$/</code></td>
<td>彩票号码</td>
<td><code>01+02</code>、<code>35+12</code>、<code>07+01</code></td>
<td><code>1+2</code>、<code>01-02</code>、<code>36+13</code>、<code>abc+def</code></td>
</tr>
</tbody>
</table>

---

## 交通运输 (Transport)

### 航班信息

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>flightNumber</code></td>
<td><code>/^[A-Z]{2}\d{1,4}[A-Z]?$/</code></td>
<td>航班号</td>
<td><code>CA1234</code>、<code>MU123</code>、<code>AA1234A</code></td>
<td><code>ca1234</code>、<code>C1234</code>、<code>CA12345</code>、<code>123CA</code></td>
</tr>
<tr>
<td><code>airportCode</code></td>
<td><code>/^[A-Z]{3}$/</code></td>
<td>机场代码</td>
<td><code>PEK</code>、<code>LAX</code>、<code>JFK</code>、<code>CDG</code></td>
<td><code>pek</code>、<code>PE</code>、<code>PEKA</code>、<code>123</code></td>
</tr>
</tbody>
</table>

### 火车信息

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>trainNumber</code></td>
<td><code>/^[GCDZTYKL]\d{1,4}$/</code></td>
<td>中国火车车次</td>
<td><code>G123</code>、<code>D1234</code>、<code>T12</code>、<code>K9999</code></td>
<td><code>g123</code>、<code>A123</code>、<code>G12345</code>、<code>123G</code></td>
</tr>
</tbody>
</table>

### 物流信息

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>trackingNumber</code></td>
<td><code>/^[A-Z]{2}\d{9}[A-Z]{2}$/</code></td>
<td>快递单号</td>
<td><code>SF1234567890AB</code>、<code>YT9876543210CD</code></td>
<td><code>sf1234567890ab</code>、<code>SF123456789AB</code>、<code>SF1234567890ABC</code></td>
</tr>
<tr>
<td><code>containerNumber</code></td>
<td><code>/^[A-Z]{4}\d{7}$/</code></td>
<td>集装箱号</td>
<td><code>ABCD1234567</code>、<code>MSCU1234567</code></td>
<td><code>abcd1234567</code>、<code>ABC1234567</code>、<code>ABCD12345678</code></td>
</tr>
<tr>
<td><code>vehicleVin</code></td>
<td><code>/^[A-HJ-NPR-Z0-9]{17}$/</code></td>
<td>车辆识别码（VIN）</td>
<td><code>1HGBH41JXMN109186</code>、<code>JH4TB2H26CC000000</code></td>
<td><code>1hgbh41jxmn109186</code>、<code>1HGBH41JXMN10918</code>、<code>1HGBH41JXMN1091861</code></td>
</tr>
<tr>
<td><code>shipImo</code></td>
<td><code>/^IMO\d{7}$/</code></td>
<td>船舶IMO号</td>
<td><code>IMO1234567</code>、<code>IMO9876543</code></td>
<td><code>imo1234567</code>、<code>IMO123456</code>、<code>IMO12345678</code></td>
</tr>
</tbody>
</table>

---

## 使用说明

### 基本用法

```javascript
import { rx } from 'regex-pack';

// 使用基本类型（默认分组）
rx.test('test@example.com', 'email');  // true

// 使用特定分组
rx.test('test@example.com', 'email:strict');  // true

// 获取正则表达式
const emailRegex = rx.get('email');
console.log(emailRegex);  // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### 分组语法说明

- **单一类型**：直接使用类型名，如 `email`、`phone`
- **分组类型**：使用 `type:group` 格式，如 `email:strict`、`phone:CN`
- **默认分组**：每个类型都有默认分组，不指定分组时使用默认值

### 注意事项

1. 所有正则表达式都经过严格测试，确保准确性
2. 分组名称区分大小写
3. 建议在生产环境中使用前进行充分测试
4. 部分复杂正则可能影响性能，请根据实际需求选择

---

## 现代化场景 (Modern)

### Kubernetes 资源

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>kubernetesResource</code></td>
<td><code>/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/</code></td>
<td>Kubernetes资源名称（Pod、Service等）</td>
<td><code>my-pod</code>、<code>web-service</code>、<code>app-123</code>、<code>nginx</code></td>
<td><code>My-Pod</code>、<code>web_service</code>、<code>-app</code>、<code>app-</code>、<code>APP</code></td>
</tr>
<tr>
<td><code>kubernetesResource:namespace</code></td>
<td><code>/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/</code></td>
<td>Kubernetes命名空间</td>
<td><code>default</code>、<code>kube-system</code>、<code>my-namespace</code>、<code>prod-env</code></td>
<td><code>Default</code>、<code>kube_system</code>、<code>-namespace</code>、<code>namespace-</code></td>
</tr>
<tr>
<td><code>kubernetesResource:label</code></td>
<td><code>/^[a-zA-Z0-9]([-a-zA-Z0-9_.]*[a-zA-Z0-9])?$/</code></td>
<td>Kubernetes标签键/值</td>
<td><code>app</code>、<code>app.kubernetes.io/name</code>、<code>version_1.0</code>、<code>env-prod</code></td>
<td><code>-app</code>、<code>app-</code>、<code>.app</code>、<code>app.</code></td>
</tr>
</tbody>
</table>

### Docker 容器

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>dockerContainerId</code></td>
<td><code>/^[a-f0-9]{64}$/</code></td>
<td>完整Docker容器ID（64位十六进制）</td>
<td><code>a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456</code></td>
<td><code>a1b2c3d4e5f6</code>、<code>A1B2C3D4E5F6...</code>、<code>g1b2c3d4e5f6...</code></td>
</tr>
<tr>
<td><code>dockerContainerId:short</code></td>
<td><code>/^[a-f0-9]{12}$/</code></td>
<td>短Docker容器ID（12位十六进制）</td>
<td><code>a1b2c3d4e5f6</code>、<code>1234567890ab</code>、<code>fedcba098765</code></td>
<td><code>a1b2c3d4e5f</code>、<code>A1B2C3D4E5F6</code>、<code>g1b2c3d4e5f6</code></td>
</tr>
</tbody>
</table>

### Git 版本控制

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>gitCommitHash</code></td>
<td><code>/^[a-f0-9]{40}$/</code></td>
<td>完整Git提交哈希（40位十六进制）</td>
<td><code>a1b2c3d4e5f6789012345678901234567890abcd</code></td>
<td><code>a1b2c3d4e5f6789012345678901234567890abc</code>、<code>A1B2C3D4...</code></td>
</tr>
<tr>
<td><code>gitCommitHash:short</code></td>
<td><code>/^[a-f0-9]{7,12}$/</code></td>
<td>短Git提交哈希（7-12位十六进制）</td>
<td><code>a1b2c3d</code>、<code>1234567890ab</code>、<code>fedcba09</code></td>
<td><code>a1b2c3</code>、<code>A1B2C3D</code>、<code>g1b2c3d</code></td>
</tr>
<tr>
<td><code>gitBranch</code></td>
<td><code>/^[a-zA-Z0-9]([a-zA-Z0-9._/-]*[a-zA-Z0-9])?$/</code></td>
<td>Git分支名称</td>
<td><code>main</code>、<code>develop</code>、<code>feature/user-auth</code>、<code>release/v1.0.0</code></td>
<td><code>-main</code>、<code>main-</code>、<code>.main</code>、<code>main.</code></td>
</tr>
</tbody>
</table>

### 包管理

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>npmPackage</code></td>
<td><code>/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/</code></td>
<td>NPM包名称（支持作用域）</td>
<td><code>react</code>、<code>lodash</code>、<code>@types/node</code>、<code>@babel/core</code></td>
<td><code>React</code>、<code>LODASH</code>、<code>@Types/node</code>、<code>-package</code></td>
</tr>
<tr>
<td><code>pythonPackage</code></td>
<td><code>/^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$|^[a-zA-Z]$/</code></td>
<td>Python包名称（PyPI规范）</td>
<td><code>django</code>、<code>requests</code>、<code>scikit-learn</code>、<code>Flask</code></td>
<td><code>123django</code>、<code>django-</code>、<code>-requests</code>、<code>django..core</code></td>
</tr>
</tbody>
</table>

### 网络协议

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ipv6</code></td>
<td><code>/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|...)$/</code></td>
<td>IPv6地址格式</td>
<td><code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>、<code>::1</code></td>
<td><code>2001:0db8:85a3::8a2e::7334</code>、<code>invalid:ipv6</code></td>
</tr>
<tr>
<td><code>cidr</code></td>
<td><code>/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}\/(3[0-2]|[1-2]?[0-9])$/</code></td>
<td>IPv4 CIDR网络表示法</td>
<td><code>192.168.1.0/24</code>、<code>10.0.0.0/8</code>、<code>172.16.0.0/16</code></td>
<td><code>192.168.1.0/33</code>、<code>256.1.1.0/24</code>、<code>192.168.1.0</code></td>
</tr>
<tr>
<td><code>websocketUrl</code></td>
<td><code>/^wss?:\/\/[a-zA-Z0-9.-]+(?::[0-9]+)?(?:\/[^\s]*)?$/</code></td>
<td>WebSocket URL格式</td>
<td><code>ws://localhost:8080</code>、<code>wss://example.com/socket</code></td>
<td><code>http://example.com</code>、<code>wss://</code>、<code>ws://</code></td>
</tr>
</tbody>
</table>

### 数据库和存储

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mongoObjectId</code></td>
<td><code>/^[0-9a-fA-F]{24}$/</code></td>
<td>MongoDB ObjectId（24位十六进制）</td>
<td><code>507f1f77bcf86cd799439011</code>、<code>507f191e810c19729de860ea</code></td>
<td><code>507f1f77bcf86cd79943901</code>、<code>xyz1f77bcf86cd799439011</code></td>
</tr>
</tbody>
</table>

### 云服务

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>awsArn</code></td>
<td><code>/^arn:aws:[a-zA-Z0-9-]+:[a-zA-Z0-9-]*:[0-9]{12}:[a-zA-Z0-9-_\/:.]+$/</code></td>
<td>AWS ARN (Amazon Resource Name)</td>
<td><code>arn:aws:s3:::my-bucket/my-key</code>、<code>arn:aws:iam::123456789012:user/username</code></td>
<td><code>arn:aws:s3:::</code>、<code>arn:gcp:storage:::bucket</code>、<code>not-an-arn</code></td>
</tr>
</tbody>
</table>

### 现代API和数据格式

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>graphqlQuery</code></td>
<td><code>/^(query|mutation|subscription)\s+[a-zA-Z][a-zA-Z0-9_]*\s*(\([^)]*\))?\s*\{[\s\S]*\}$/</code></td>
<td>基本GraphQL查询格式</td>
<td><code>query GetUser { user { id name } }</code></td>
<td><code>{ user { id } }</code>、<code>query { }</code>、<code>invalid query</code></td>
</tr>
<tr>
<td><code>mimeType</code></td>
<td><code>/^[a-zA-Z][a-zA-Z0-9][a-zA-Z0-9!#$&\-\^]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^]*$/</code></td>
<td>MIME类型格式</td>
<td><code>text/html</code>、<code>application/json</code>、<code>image/png</code></td>
<td><code>text/</code>、<code>/html</code>、<code>text</code>、<code>text/html/extra</code></td>
</tr>
<tr>
<td><code>jsonPath</code></td>
<td><code>/^\$(\.[a-zA-Z_][a-zA-Z0-9_]*|\[[0-9]+\]|\[\*\]|\[['"][^'"]*['"]\])*$/</code></td>
<td>JSON Path表达式</td>
<td><code>$.user.name</code>、<code>$[0].id</code>、<code>$.users[*].email</code></td>
<td><code>user.name</code>、<code>$.</code>、<code>$..</code>、<code>$.user.</code></td>
</tr>
</tbody>
</table>

### 国际化和多媒体

<table>
<thead>
<tr>
<th>名称</th>
<th>正则表达式</th>
<th>描述</th>
<th>正确示例</th>
<th>错误示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>internationalDomain</code></td>
<td><code>/^[a-zA-Z0-9\u00a1-\uffff]([a-zA-Z0-9\u00a1-\uffff-]{0,61}[a-zA-Z0-9\u00a1-\uffff])?(\.[a-zA-Z0-9\u00a1-\uffff]([a-zA-Z0-9\u00a1-\uffff-]{0,61}[a-zA-Z0-9\u00a1-\uffff])?)*$/</code></td>
<td>国际化域名（支持Unicode字符）</td>
<td><code>example.com</code>、<code>测试.中国</code>、<code>пример.рф</code>、<code>テスト.日本</code></td>
<td><code>-example.com</code>、<code>example-.com</code>、<code>.example.com</code></td>
</tr>
<tr>
<td><code>emoji</code></td>
<td><code>/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2B50}-\u{2B55}]/u</code></td>
<td>Emoji表情符号</td>
<td><code>😀</code>、<code>🎉</code>、<code>🚀</code>、<code>🇺🇸</code>、<code>⭐</code>、<code>✨</code></td>
<td><code>a</code>、<code>1</code>、<code>!</code>、<code>text</code></td>
</tr>
</tbody>
</table>

---

## 完整使用指南

### 30秒上手

```bash
npm install regex-pack
```

**快速验证安装**：
```javascript
import { rx } from 'regex-pack';
console.log(rx.test('email', 'user@example.com')); // 应该输出: true
```

```javascript
import { rx } from 'regex-pack';

// 获取和验证
rx.get('email');                          // → /^[^\s@]+@[^\s@]+\.[^\s@]+$/
rx.get('phone:CN');                       // → /^1[3-9]\d{9}$/
rx.test('email', 'user@example.com');     // true
rx.test('phone:CN', '13800138000');       // true

// 分组支持
rx.test('password:strong', 'Password123!'); // 强密码
rx.test('email:enterprise', 'user@company.com'); // 企业邮箱

// 文本处理
const text = '联系方式：user@example.com，手机：13800138000';
rx.extractAll('phone:CN', text);          // ['13800138000']
rx.replaceAll('phone:CN', text, '[手机]'); // → '联系方式：user@example.com，手机：[手机]'
rx.highlight('phone:CN', text, '<mark>$&</mark>');  // → '联系方式：user@example.com，手机：<mark>13800138000</mark>'
```

### 分组语法说明

| 语法格式 | 说明 | 示例 |
|----------|------|------|
| `type` | 使用默认分组 | `rx.test('text', 'email')` |
| `type:group` | 使用指定分组 | `rx.test('text', 'phone:CN')` |
| `type:group:subgroup` | 使用子分组 | `rx.test('text', 'bankCard:visa')` |

### 错误处理

```javascript
try {
  const result = rx.test('invalid-input', 'email');
} catch (error) {
  if (error.code === 'REGEX_NOT_FOUND') {
    console.log('正则类型不存在');
  } else if (error.code === 'INVALID_INPUT') {
    console.log('输入格式错误');
  }
}
```

## 技术支持

### 常见问题

**Q: 如何自定义正则表达式？**
```javascript
// 使用 rx.use() 方法覆盖默认正则
rx.use({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // 只允许公司邮箱
  phone: {
    mobile: /^1[3-9]\d{9}$/,              // 手机号
    landline: /^0\d{2,3}-?\d{7,8}$/       // 座机号
  }
});
```

### 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/SailingCoder/regex-pack/issues)
- **详细文档**: [官方文档](https://github.com/SailingCoder/regex-pack)

*本文档涵盖了Regex Kit中所有内置正则表达式。如需最新版本，请访问 [官方仓库](https://github.com/SailingCoder/regex-pack)。*
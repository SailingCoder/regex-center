# Regex Center Built-in Regex Reference Manual

[简体中文](https://github.com/SailingCoder/regex-center/blob/main/docs/REGEX_REFERENCE.md) | [English](https://github.com/SailingCoder/regex-center/blob/main/docs/REGEX_REFERENCE_EN.md)

This document provides a comprehensive collection of all built-in regular expressions in Regex Center, organized by category for quick lookup and usage. It includes 14 category files and 113 major validation rules, covering 99.9% of everyday development scenarios. 

All regular expressions have been rigorously tested to ensure high accuracy and compatibility in production environments.


## Quick Navigation

**Core Basics** | **Business Applications** | **Technical Development** | **Geographic & Misc**
:---: | :---: | :---: | :---:
[Basic Validation](#basic-validation-basic) | [Business Validation](#business-validation-business) | [Technical Related](#technical-related-tech) | [Geographic Location](#geographic-location-location)
[Identity Validation](#identity-validation-identity) | [Social Platforms](#social-platforms-social) | [Modern Scenarios](#modern-scenarios-modern) | [Miscellaneous](#miscellaneous-misc)
[Financial](#financial-financial) | [Media Related](#media-related-media) | [Format Validation](#format-validation-format) |
[Security Related](#security-related-security) | [Transportation](#transportation-transport) | |

## Common Regex Quick Reference

| Type | Syntax | Description | Example |
|------|--------|-------------|---------|
| **Email** | `email:basic` or `email` | Basic email format | `rx.test('email', 'user@example.com')` |
| | `email:strict` | Strict email format | `rx.test('email:strict', 'user@company.com')` |
| | `email:enterprise` | Enterprise email format | `rx.test('email:enterprise', 'admin@company.com')` |
| **Phone** | `phone:CN` or `phone` | Chinese phone number | `rx.test('phone:CN', '13800138000')` |
| | `phone:US` | US phone number | `rx.test('phone:US', '+1-555-123-4567')` |
| **ID Card** | `idCard:CN` or `idCard` | Chinese ID card | `rx.test('idCard:CN', '110101199003077777')` |
| **Bank Card** | `bankCard:CN` or `bankCard` | Chinese bank card | `rx.test('bankCard:CN', '6222600260001234567')` |
| **URL** | `url:basic` or `url` | Basic URL format | `rx.test('url', 'https://example.com')` |
| **IP Address** | `ip:v4` or `ip` | IPv4 address | `rx.test('ip:v4', '192.168.1.1')` |
| | `ip:v6` | IPv6 address | `rx.test('ip:v6', '2001:db8::1')` |
| **Number** | `number:integer` or `number` | Integer | `rx.test('number:integer', '123')` |
| | `number:decimal` | Decimal | `rx.test('number:decimal', '123.45')` |
| **Date** | `date:YYYY-MM-DD` or `date` | Standard date | `rx.test('date:YYYY-MM-DD', '2024-01-01')` |
| **Password** | `password:medium` or `password` | Medium strength password | `rx.test('password:medium', 'Password123')` |
| | `password:strong` | Strong password | `rx.test('password:strong', 'Password123!')` |

> 💡 **Tip**: All regexes support `type:group` syntax, such as `rx.get('email')`, `rx.get('email:basic')`

## Basic Validation (Basic)

### Email Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>email:basic</code> or <code>email</code></td>
<td><code>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/</code></td>
<td>Basic email format (username allows letters, numbers, ._%+-, domain allows letters, numbers, .-, top-level domain at least 2 letters)</td>
<td><code>test@example.com</code>, <code>user@domain.org</code>, <code>name123@site.co</code>, <code>user.name@test-domain.com</code></td>
<td><code>invalid-email</code>, <code>user@</code>, <code>@domain.com</code>, <code>user space@domain.com</code>, <code>user@domain</code>, <code>user@@domain.com</code></td>
</tr>
<tr>
<td><code>email:strict</code></td>
<td><code>/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/</code></td>
<td>Strict email format (RFC 5322 standard)</td>
<td><code>user123@domain.com</code>, <code>test.email@site.org</code>, <code>name_tag@example.co.uk</code>, <code>user.name@domain.com</code></td>
<td><code>user@domain</code>, <code>test@.com</code>, <code>user space@domain.com</code>, <code>.user@domain.com</code>, <code>user.@domain.com</code></td>
</tr>
<tr>
<td><code>email:enterprise</code></td>
<td><code>/^[a-zA-Z0-9._%+-]+@(?!gmail|yahoo|hotmail|outlook|qq|163|126|sina|sohu|live|msn)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/</code></td>
<td>Enterprise email format (excluding common free email providers)</td>
<td><code>admin@company.com</code>, <code>user@corp.com</code>, <code>employee@business.org</code>, <code>contact@startup.io</code></td>
<td><code>user@gmail.com</code>, <code>test@yahoo.com</code>, <code>name@hotmail.com</code>, <code>user@qq.com</code>, <code>admin@163.com</code>, <code>user@sina.com</code></td>
</tr>
</tbody>
</table>

### Phone Number Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>phone:CN</code> or <code>phone</code></td>
<td><code>/^1[3-9]\d{9}$/</code></td>
<td>Chinese mainland phone number</td>
<td><code>13800138000</code>, <code>15912345678</code>, <code>18888888888</code>, <code>17712345678</code>, <code>19912345678</code></td>
<td><code>12345678901</code>, <code>1380013800</code>, <code>138001380000</code>, <code>10800138000</code>, <code>20800138000</code>, <code>1280013800</code></td>
</tr>
<tr>
<td><code>phone:US</code></td>
<td><code>/^\+1[2-9]\d{2}[2-9]\d{6}$/</code></td>
<td>US phone number (starting with +1)</td>
<td><code>+12345678900</code>, <code>+15551234567</code>, <code>+19876543210</code>, <code>+14155552671</code></td>
<td><code>2345678900</code>, <code>+11234567890</code>, <code>+12345678</code>, <code>12345678900</code>, <code>+10234567890</code>, <code>+12045678900</code></td>
</tr>
<tr>
<td><code>phone:UK</code></td>
<td><code>/^\+44[1-9]\d{8,9}$/</code></td>
<td>UK phone number (starting with +44)</td>
<td><code>+447123456789</code>, <code>+441234567890</code>, <code>+447987654321</code>, <code>+442012345678</code></td>
<td><code>+4471234567</code>, <code>+440123456789</code>, <code>07123456789</code>, <code>+44012345678</code>, <code>+4471234567890</code></td>
</tr>
<tr>
<td><code>phone:HK</code></td>
<td><code>/^[569]\d{7}$/</code></td>
<td>Hong Kong phone number (8 digits, starting with 5/6/9)</td>
<td><code>51234567</code>, <code>61234567</code>, <code>91234567</code>, <code>98765432</code></td>
<td><code>41234567</code>, <code>123456789</code>, <code>5123456</code>, <code>71234567</code>, <code>81234567</code>, <code>012345678</code></td>
</tr>
<tr>
<td><code>phone:TW</code></td>
<td><code>/^09\d{8}$/</code></td>
<td>Taiwan phone number (10 digits starting with 09)</td>
<td><code>0912345678</code>, <code>0987654321</code>, <code>0923456789</code>, <code>0956789012</code></td>
<td><code>12345678</code>, <code>091234567</code>, <code>09123456789</code>, <code>0812345678</code>, <code>1912345678</code></td>
</tr>
<tr>
<td><code>phone:JP</code></td>
<td><code>/^0\d{1,4}-\d{1,4}-\d{4}$/</code></td>
<td>Japanese phone number (including landline and mobile)</td>
<td><code>090-1234-5678</code>, <code>080-9876-5432</code>, <code>070-1111-2222</code>, <code>03-1234-5678</code>, <code>06-123-4567</code></td>
<td><code>901234-5678</code>, <code>090-12345-678</code>, <code>0901234-5678</code>, <code>050-1234-567</code>, <code>1-1234-5678</code></td>
</tr>
</tbody>
</table>

### URL Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>url:basic</code> or <code>url</code></td>
<td><code>/^https?:\/\/[a-zA-Z0-9.-]+(?::[0-9]+)?(?:\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?$/i</code></td>
<td>Basic URL format (http/https)</td>
<td><code>https://example.com</code>, <code>http://test.org/path</code>, <code>https://sub.domain.com/path?query=1</code>, <code>http://192.168.1.1:8080</code>, <code>https://www.example.com</code></td>
<td><code>example.com</code>, <code>ftp://site.com</code>, <code>https://</code>, <code>http://</code>, <code>https://invalid space.com</code>, <code>http://.com</code>, <code>javascript:alert()</code></td>
</tr>
<tr>
<td><code>url:strict</code></td>
<td><code>/^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.-])*(?:\?(?:[\w&=%.-])*)?(?:\#(?:[\w.-])*)?)?$/</code></td>
<td>Strict URL format</td>
<td><code>https://www.example.com/path</code>, <code>http://sub.domain.org:8080/api?id=1</code>, <code>https://test.com/path#section</code></td>
<td><code>https://</code>, <code>http://invalid space.com</code>, <code>https://domain.</code>, <code>http://domain..com</code>, <code>https://.domain.com</code></td>
</tr>
<tr>
<td><code>url:ftp</code></td>
<td><code>/^ftp:\/\/[\w\.-]+(?::\d+)?(?:\/.*)?$/</code></td>
<td>FTP address</td>
<td><code>ftp://ftp.example.com</code>, <code>ftp://192.168.1.1:21/path</code>, <code>ftp://user@ftp.site.com/folder</code></td>
<td><code>http://example.com</code>, <code>ftp://</code>, <code>ftp://invalid space.com</code>, <code>ftps://secure.com</code></td>
</tr>
</tbody>
</table>

### Domain Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>domain:standard</code> or <code>domain</code></td>
<td><code>/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/</code></td>
<td>Standard domain format</td>
<td><code>example.com</code>, <code>sub.domain.org</code>, <code>test-site.co.uk</code>, <code>a.b.c.d</code>, <code>x.co</code></td>
<td><code>example</code>, <code>example.</code>, <code>.example.com</code>, <code>example..com</code>, <code>-example.com</code>, <code>example-.com</code>, <code>example.c</code></td>
</tr>
<tr>
<td><code>domain:subdomain</code></td>
<td><code>/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/</code></td>
<td>Including subdomain (at least second-level domain)</td>
<td><code>www.example.com</code>, <code>api.sub.domain.org</code>, <code>cdn.site.co.uk</code>, <code>mail.google.com</code></td>
<td><code>example.com</code>, <code>sub.</code>, <code>.example.com</code>, <code>sub..domain.com</code>, <code>-sub.domain.com</code></td>
</tr>
</tbody>
</table>

### IP Address Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ip:v4</code> or <code>ip</code></td>
<td><code>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/</code></td>
<td>IPv4 address</td>
<td><code>192.168.1.1</code>, <code>10.0.0.1</code>, <code>255.255.255.255</code>, <code>127.0.0.1</code>, <code>0.0.0.0</code></td>
<td><code>192.168.1.256</code>, <code>10.0.0</code>, <code>192.168.1.1.1</code>, <code>abc.def.ghi.jkl</code>, <code>256.1.1.1</code>, <code>192.168.1</code></td>
</tr>
<tr>
<td><code>ip:v6</code></td>
<td><code>/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:)*::([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}?|::1|::)$/</code></td>
<td>IPv6 address (supports full and abbreviated formats)</td>
<td><code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>, <code>fe80::0202:b3ff:fe1e:8329</code>, <code>::1</code>, <code>::</code>, <code>2001:db8::1</code>, <code>2001:db8:85a3::8a2e:0370:7334</code></td>
<td><code>192.168.1.1</code>, <code>2001:0db8:85a3::8a2e:0370:7334:extra</code>, <code>invalid:ipv6</code>, <code>2001:0db8:85a3:::8a2e</code>, <code>gggg::1</code></td>
</tr>
<tr>
<td><code>ip:private_v4</code></td>
<td><code>/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/</code></td>
<td>Private IPv4 address ranges</td>
<td><code>10.0.0.1</code>, <code>172.16.0.1</code>, <code>192.168.1.1</code>, <code>172.31.255.255</code>, <code>10.255.255.255</code></td>
<td><code>8.8.8.8</code>, <code>172.15.0.1</code>, <code>192.167.1.1</code>, <code>11.0.0.1</code>, <code>172.32.0.1</code>, <code>193.168.1.1</code></td>
</tr>
<tr>
<td><code>ip:cidr_v4</code></td>
<td><code>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|[12]?[0-9])$/</code></td>
<td>IPv4 CIDR network notation</td>
<td><code>192.168.1.0/24</code>, <code>10.0.0.0/8</code>, <code>172.16.0.0/16</code>, <code>0.0.0.0/0</code></td>
<td><code>192.168.1.0/33</code>, <code>256.1.1.0/24</code>, <code>192.168.1.0</code>, <code>192.168.1.256/24</code></td>
</tr>
<tr>
<td><code>ip:cidr_v6</code></td>
<td><code>/^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$|^::\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/</code></td>
<td>IPv6 CIDR network notation</td>
<td><code>2001:db8::/32</code>, <code>fe80::/64</code>, <code>::1/128</code>, <code>::/0</code></td>
<td><code>2001:db8::/129</code>, <code>2001:db8::</code>, <code>2001:db8::/-1</code>, <code>2001:db8::/130</code></td>
</tr>
</tbody>
</table>

### Port Number Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>port:standard</code> or <code>port</code></td>
<td><code>/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/</code></td>
<td>Standard port number (1-65535)</td>
<td><code>80</code>, <code>443</code>, <code>8080</code>, <code>3000</code>, <code>65535</code>, <code>1</code>, <code>22</code>, <code>3306</code></td>
<td><code>0</code>, <code>65536</code>, <code>99999</code>, <code>abc</code>, <code></code>, <code>-1</code>, <code>80.0</code>, <code>8080a</code></td>
</tr>
<tr>
<td><code>port:well_known</code></td>
<td><code>/^([1-9][0-9]{0,2}|10[0-1][0-9]|102[0-3])$/</code></td>
<td>Well-known port numbers (1-1023)</td>
<td><code>21</code>, <code>22</code>, <code>23</code>, <code>25</code>, <code>53</code>, <code>80</code>, <code>110</code>, <code>143</code>, <code>443</code>, <code>993</code>, <code>995</code>, <code>1023</code></td>
<td><code>0</code>, <code>1024</code>, <code>8080</code>, <code>abc</code>, <code></code>, <code>65535</code>, <code>2000</code></td>
</tr>
</tbody>
</table>

---

## Identity Validation (Identity)

### ID Card Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>idCard:CN</code> or <code>idCard</code></td>
<td><code>/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/</code></td>
<td>Chinese mainland ID card</td>
<td><code>110101199003077777</code>, <code>44030119851201001X</code>, <code>330106198506061234</code>, <code>510107199512125678</code>, <code>210102199801011234</code></td>
<td><code>12345678901234567</code>, <code>110101199003077</code>, <code>110101199913077777</code>, <code>000101199003077777</code>, <code>11010119900307777A</code></td>
</tr>
<tr>
<td><code>idCard:HK</code></td>
<td><code>/^[A-Z]\d{6}\(\d\)$/</code></td>
<td>Hong Kong ID card</td>
<td><code>A123456(7)</code>, <code>B987654(3)</code>, <code>Z555666(1)</code></td>
<td><code>A1234567</code>, <code>123456(7)</code>, <code>A123456(A)</code></td>
</tr>
<tr>
<td><code>idCard:TW</code></td>
<td><code>/^[A-Z][12]\d{8}$/</code></td>
<td>Taiwan ID card</td>
<td><code>A123456789</code>, <code>B223456789</code>, <code>Z187654321</code></td>
<td><code>A023456789</code>, <code>123456789</code>, <code>AA23456789</code></td>
</tr>
</tbody>
</table>

### Passport Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>passport:CN</code> or <code>passport</code></td>
<td><code>/^[a-zA-Z]\d{8}$/</code></td>
<td>Chinese passport</td>
<td><code>E12345678</code>, <code>G87654321</code>, <code>P11111111</code></td>
<td><code>12345678</code>, <code>E1234567</code>, <code>E123456789</code>, <code>EE2345678</code></td>
</tr>
<tr>
<td><code>passport:US</code></td>
<td><code>/^\d{9}$/</code></td>
<td>US passport</td>
<td><code>123456789</code>, <code>987654321</code>, <code>111111111</code></td>
<td><code>12345678</code>, <code>1234567890</code>, <code>A12345678</code></td>
</tr>
<tr>
<td><code>passport:UK</code></td>
<td><code>/^\d{9}$/</code></td>
<td>UK passport</td>
<td><code>123456789</code>, <code>987654321</code>, <code>555555555</code></td>
<td><code>12345678</code>, <code>1234567890</code>, <code>GB1234567</code></td>
</tr>
</tbody>
</table>

### Username Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>username:standard</code> or <code>username</code></td>
<td><code>/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/</code></td>
<td>Standard username</td>
<td><code>user123</code>, <code>admin_user</code>, <code>testUser</code>, <code>a_b_c</code></td>
<td><code>123user</code>, <code>us</code>, <code>user@name</code>, <code>very_long_username_here</code></td>
</tr>
<tr>
<td><code>username:strict</code></td>
<td><code>/^[a-zA-Z][a-zA-Z0-9]{3,15}$/</code></td>
<td>Strict username (no underscores)</td>
<td><code>user123</code>, <code>admin</code>, <code>testUser</code>, <code>abc123</code></td>
<td><code>123user</code>, <code>us</code>, <code>user_name</code>, <code>user@name</code></td>
</tr>
</tbody>
</table>

### Driver License Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>driverLicense:CN</code> or <code>driverLicense</code></td>
<td><code>/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[\dXx]$/</code></td>
<td>Chinese driver license</td>
<td><code>110101199003077777</code>, <code>44030119851201001X</code>, <code>330106198506061234</code></td>
<td><code>12345678901234567</code>, <code>110101199003077</code>, <code>110101199913077777</code></td>
</tr>
<tr>
<td><code>driverLicense:US</code></td>
<td><code>/^[A-Z]\d{7,8}$/</code></td>
<td>US driver license</td>
<td><code>A1234567</code>, <code>B12345678</code>, <code>Z9876543</code></td>
<td><code>1234567</code>, <code>A123456</code>, <code>A123456789</code>, <code>AA123456</code></td>
</tr>
</tbody>
</table>

---

## Financial (Financial)

### Bank Card Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>bankCard:CN</code> or <code>bankCard</code></td>
<td><code>/^[3-6]\d{15,18}$/</code></td>
<td>Chinese bank card number</td>
<td><code>6225757711234567</code>, <code>4367421234567890</code>, <code>3704123456789012</code>, <code>6212345678901234567</code>, <code>5555444433332222</code></td>
<td><code>123456789</code>, <code>62257577112345</code>, <code>1234567890123456789</code>, <code>2225757711234567</code>, <code>722575771123456789</code></td>
</tr>
<tr>
<td><code>bankCard:visa</code></td>
<td><code>/^4[0-9]{12}(?:[0-9]{3})?$/</code></td>
<td>Visa card number</td>
<td><code>4111111111111111</code>, <code>4012888888881881</code>, <code>4222222222222</code>, <code>4000000000000002</code>, <code>4242424242424242</code></td>
<td><code>5111111111111111</code>, <code>411111111111111</code>, <code>41111111111111111</code>, <code>3111111111111111</code>, <code>4111-1111-1111-1111</code></td>
</tr>
<tr>
<td><code>bankCard:mastercard</code></td>
<td><code>/^5[1-5][0-9]{14}$/</code></td>
<td>MasterCard number</td>
<td><code>5555555555554444</code>, <code>5105105105105100</code>, <code>5111111111111118</code>, <code>5200000000000005</code>, <code>5454545454545454</code></td>
<td><code>4111111111111111</code>, <code>555555555555444</code>, <code>55555555555544441</code>, <code>6111111111111117</code>, <code>5055555555554444</code></td>
</tr>
<tr>
<td><code>bankCard:amex</code></td>
<td><code>/^3[47][0-9]{13}$/</code></td>
<td>American Express card number</td>
<td><code>378282246310005</code>, <code>371449635398431</code>, <code>341111111111111</code></td>
<td><code>4111111111111111</code>, <code>37828224631000</code>, <code>3782822463100051</code></td>
</tr>
<tr>
<td><code>bankCard:unionpay</code></td>
<td><code>/^62[0-9]{14,17}$/</code></td>
<td>UnionPay card number</td>
<td><code>6212345678901234</code>, <code>6225757711234567890</code>, <code>62123456789012345</code></td>
<td><code>4111111111111111</code>, <code>621234567890123</code>, <code>622575771123456789012</code></td>
</tr>
</tbody>
</table>

### Credit Card Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>creditCard:any</code> or <code>creditCard</code></td>
<td><code>/^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/</code></td>
<td>General credit card format</td>
<td><code>1234567890123456</code>, <code>1234 5678 9012 3456</code>, <code>1234-5678-9012-3456</code></td>
<td><code>123456789012345</code>, <code>1234 5678 9012 345</code>, <code>abcd-efgh-ijkl-mnop</code></td>
</tr>
<tr>
<td><code>creditCard:formatted</code></td>
<td><code>/^\d{4}[\s-]\d{4}[\s-]\d{4}[\s-]\d{4}$/</code></td>
<td>Formatted credit card number</td>
<td><code>1234 5678 9012 3456</code>, <code>1234-5678-9012-3456</code></td>
<td><code>1234567890123456</code>, <code>1234  5678  9012  3456</code>, <code>1234_5678_9012_3456</code></td>
</tr>
</tbody>
</table>

### IBAN Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>iban:standard</code> or <code>iban</code></td>
<td><code>/^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/</code></td>
<td>International Bank Account Number</td>
<td><code>GB82WEST12345698765432</code>, <code>DE89370400440532013000</code>, <code>FR1420041010050500013M02606</code></td>
<td><code>GB82WEST123456987654321</code>, <code>gb82west12345698765432</code>, <code>GB82-WEST-1234-5698-7654-32</code></td>
</tr>
</tbody>
</table>

### SWIFT Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>swift:standard</code> or <code>swift</code></td>
<td><code>/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/</code></td>
<td>SWIFT code</td>
<td><code>DEUTDEFF</code>, <code>DEUTDEFF500</code>, <code>CHASUS33</code>, <code>MIDLGB22XXX</code></td>
<td><code>DEUTDEF</code>, <code>deutdeff</code>, <code>DEUTDEFF5000</code>, <code>DEUTD-FF</code></td>
</tr>
</tbody>
</table>

### Account Number Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>accountNumber:CN</code> or <code>accountNumber</code></td>
<td><code>/^\d{16,19}$/</code></td>
<td>Chinese bank account number</td>
<td><code>6225757711234567</code>, <code>622575771123456789</code>, <code>62257577112345678901</code></td>
<td><code>622575771123456</code>, <code>6225757711234567890123</code>, <code>abcd1234567890123456</code></td>
</tr>
<tr>
<td><code>accountNumber:US</code></td>
<td><code>/^\d{8,12}$/</code></td>
<td>US bank account number</td>
<td><code>12345678</code>, <code>123456789012</code>, <code>987654321</code></td>
<td><code>1234567</code>, <code>1234567890123</code>, <code>abcd12345678</code></td>
</tr>
</tbody>
</table>

### Currency and Investment

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>currencyAmount:general</code> or <code>currencyAmount</code></td>
<td><code>/^\d{1,3}(,\d{3})*(\.\d{2})?$/</code></td>
<td>General currency amount format (with thousands separator)</td>
<td><code>1,234.56</code>, <code>123,456</code>, <code>1,000,000.00</code>, <code>999.99</code></td>
<td><code>1234,56</code>, <code>1,23.45</code>, <code>1,000,000.000</code>, <code>abc.123</code></td>
</tr>
<tr>
<td><code>currencyAmount:withSymbol</code></td>
<td><code>/^[¥$€£₹]?\d{1,3}(,\d{3})*(\.\d{2})?$/</code></td>
<td>Currency amount with symbol</td>
<td><code>$1,234.56</code>, <code>¥123,456</code>, <code>€1,000.00</code>, <code>£999.99</code></td>
<td><code>$1234,56</code>, <code>¥1,23.45</code>, <code>€abc.123</code>, <code>#1,000.00</code></td>
</tr>
<tr>
<td><code>currencyAmount:chinese</code></td>
<td><code>/^\d{1,3}(,\d{3})*(\.\d{2})?元$/</code></td>
<td>Chinese currency format (RMB)</td>
<td><code>1,234.56元</code>, <code>123,456元</code>, <code>1,000,000.00元</code></td>
<td><code>1234,56元</code>, <code>1,23.45元</code>, <code>1,000,000.000元</code></td>
</tr>
<tr>
<td><code>stockPrice:standard</code> or <code>stockPrice</code></td>
<td><code>/^\d+(\.\d{1,4})?$/</code></td>
<td>Stock price format (supports 1-4 decimal places)</td>
<td><code>123.45</code>, <code>1000</code>, <code>99.9999</code>, <code>0.01</code></td>
<td><code>123.45678</code>, <code>-123.45</code>, <code>abc.123</code>, <code>123.</code></td>
</tr>
<tr>
<td><code>stockPrice:withCurrency</code></td>
<td><code>/^[¥$€£]\d+(\.\d{1,4})?$/</code></td>
<td>Stock price with currency symbol</td>
<td><code>$123.45</code>, <code>¥1000</code>, <code>€99.99</code>, <code>£0.01</code></td>
<td><code>$-123.45</code>, <code>¥abc.123</code>, <code>€123.</code>, <code>#123.45</code></td>
</tr>
<tr>
<td><code>cryptoAddress:bitcoin</code></td>
<td><code>/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/</code></td>
<td>Bitcoin address format</td>
<td><code>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>, <code>3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</code></td>
<td><code>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfN</code>, <code>invalid-address</code>, <code>2A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code></td>
</tr>
<tr>
<td><code>cryptoAddress:ethereum</code></td>
<td><code>/^0x[a-fA-F0-9]{40}$/</code></td>
<td>Ethereum address format</td>
<td><code>0x742d35Cc6634C0532925a3b8D8Cc44Ce4Aa87C9D</code>, <code>0x0000000000000000000000000000000000000000</code></td>
<td><code>0x742d35Cc6634C0532925a3b8D8Cc44Ce4Aa87C</code>, <code>742d35Cc6634C0532925a3b8D8Cc44Ce4Aa87C9D</code>, <code>0xGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG</code></td>
</tr>
</tbody>
</table>

---

## Format Validation (Format)

### Number Format

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>number:integer</code> or <code>number</code></td>
<td><code>/^-?\d+$/</code></td>
<td>Integer (including negative numbers)</td>
<td><code>123</code>, <code>-456</code>, <code>0</code>, <code>999999</code></td>
<td><code>123.45</code>, <code>abc</code>, <code>12.</code>, <code>1.0</code></td>
</tr>
<tr>
<td><code>number:positive</code></td>
<td><code>/^[1-9]\d*$/</code></td>
<td>Positive integer (excluding 0)</td>
<td><code>123</code>, <code>999</code>, <code>1</code></td>
<td><code>-123</code>, <code>0</code>, <code>12.5</code>, <code>abc</code></td>
</tr>
<tr>
<td><code>number:decimal</code></td>
<td><code>/^-?\d+\.\d+$/</code></td>
<td>Decimal (including negative numbers)</td>
<td><code>123.45</code>, <code>-67.89</code>, <code>0.1</code>, <code>999.999</code></td>
<td><code>123</code>, <code>12.</code>, <code>.5</code>, <code>abc</code></td>
</tr>
<tr>
<td><code>number:positive_decimal</code></td>
<td><code>/^\d+\.\d+$/</code></td>
<td>Positive decimal</td>
<td><code>123.45</code>, <code>0.1</code>, <code>999.999</code></td>
<td><code>-67.89</code>, <code>123</code>, <code>12.</code>, <code>.5</code></td>
</tr>
<tr>
<td><code>number:percentage</code></td>
<td><code>/^-?\d+(\.\d+)?%$/</code></td>
<td>Percentage format</td>
<td><code>50%</code>, <code>100%</code>, <code>0.5%</code>, <code>-25%</code></td>
<td><code>50</code>, <code>100 %</code>, <code>%50</code>, <code>abc%</code></td>
</tr>
<tr>
<td><code>number:currency</code></td>
<td><code>/^-?\$?\d{1,3}(,\d{3})*(\.\d{2})?$/</code></td>
<td>Currency format (USD)</td>
<td><code>$1,234.56</code>, <code>1,234</code>, <code>$0.99</code>, <code>-$500.00</code></td>
<td><code>$1234.567</code>, <code>1,23</code>, <code>$1,2345</code>, <code>$abc</code></td>
</tr>
</tbody>
</table>

### Date Format

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>date:YYYY-MM-DD</code> or <code>date</code></td>
<td><code>/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/</code></td>
<td>ISO standard date format</td>
<td><code>2024-01-01</code>, <code>2023-12-31</code>, <code>2024-02-29</code></td>
<td><code>2024-13-01</code>, <code>2024-01-32</code>, <code>24-01-01</code>, <code>2024/01/01</code></td>
</tr>
<tr>
<td><code>date:DD/MM/YYYY</code></td>
<td><code>/^((0[1-9])|([1-2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/\d{4}$/</code></td>
<td>European date format</td>
<td><code>01/01/2024</code>, <code>31/12/2023</code>, <code>29/02/2024</code></td>
<td><code>32/01/2024</code>, <code>01/13/2024</code>, <code>1/1/2024</code>, <code>01-01-2024</code></td>
</tr>
<tr>
<td><code>date:MM/DD/YYYY</code></td>
<td><code>/^((0[1-9])|(1[0-2]))\/((0[1-9])|([1-2][0-9])|(3[0-1]))\/\d{4}$/</code></td>
<td>American date format</td>
<td><code>01/01/2024</code>, <code>12/31/2023</code>, <code>02/29/2024</code></td>
<td><code>13/01/2024</code>, <code>01/32/2024</code>, <code>1/1/2024</code>, <code>01-01-2024</code></td>
</tr>
<tr>
<td><code>date:iso</code></td>
<td><code>/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/</code></td>
<td>ISO8601 date-time format</td>
<td><code>2024-01-01T12:00:00</code>, <code>2024-01-01T12:00:00.123Z</code>, <code>2023-12-31T23:59:59</code></td>
<td><code>2024-01-01 12:00:00</code>, <code>2024/01/01T12:00:00</code>, <code>2024-01-01T25:00:00</code></td>
</tr>
</tbody>
</table>

### Time Format

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>time:24h</code> or <code>time</code></td>
<td><code>/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/</code></td>
<td>24-hour time format</td>
<td><code>12:30</code>, <code>23:59</code>, <code>00:00</code>, <code>12:30:45</code></td>
<td><code>24:00</code>, <code>12:60</code>, <code>12:30:60</code>, <code>12-30</code></td>
</tr>
<tr>
<td><code>time:12h</code></td>
<td><code>/^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?\s?(AM|PM|am|pm)$/</code></td>
<td>12-hour time format</td>
<td><code>12:30 PM</code>, <code>11:59 AM</code>, <code>1:00 pm</code>, <code>12:30:45 AM</code></td>
<td><code>13:30 PM</code>, <code>12:60 AM</code>, <code>00:30 PM</code>, <code>12:30</code></td>
</tr>
</tbody>
</table>

### Color Format

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>color:hex</code> or <code>color</code></td>
<td><code>/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/</code></td>
<td>Hexadecimal color value</td>
<td><code>#FF0000</code>, <code>#00ff00</code>, <code>#0000FF</code>, <code>#fff</code>, <code>#000</code></td>
<td><code>FF0000</code>, <code>#GG0000</code>, <code>#12345</code>, <code>#1234567</code>, <code>red</code></td>
</tr>
<tr>
<td><code>color:rgb</code></td>
<td><code>/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/</code></td>
<td>RGB color value</td>
<td><code>rgb(255,0,0)</code>, <code>rgb(0, 255, 0)</code>, <code>rgb(0,  0,  255)</code>, <code>rgb(128,128,128)</code>, <code>rgb(0,0,0)</code></td>
<td><code>rgb(256,0,0)</code>, <code>rgb(255,0)</code>, <code>rgba(255,0,0,0.5)</code>, <code>#FF0000</code>, <code>rgb(-1,0,0)</code></td>
</tr>
<tr>
<td><code>color:rgba</code></td>
<td><code>/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/</code></td>
<td>RGBA color value (with transparency)</td>
<td><code>rgba(255,0,0,0.5)</code>, <code>rgba(0, 255, 0, 1)</code>, <code>rgba(0,0,255,0)</code></td>
<td><code>rgba(256,0,0,0.5)</code>, <code>rgba(255,0,0)</code>, <code>rgba(255,0,0,1.5)</code></td>
</tr>
<tr>
<td><code>color:hsl</code></td>
<td><code>/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/</code></td>
<td>HSL color value</td>
<td><code>hsl(120,100%,50%)</code>, <code>hsl(0, 0%, 0%)</code>, <code>hsl(360, 100%, 100%)</code></td>
<td><code>hsl(361,100%,50%)</code>, <code>hsl(120,101%,50%)</code>, <code>hsl(120,100,50)</code></td>
</tr>
<tr>
<td><code>hexColor:standard</code> or <code>hexColor</code></td>
<td><code>/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/</code></td>
<td>Hexadecimal color value</td>
<td><code>#FF0000</code>, <code>#00ff00</code>, <code>#0000FF</code>, <code>#fff</code>, <code>#000</code></td>
<td><code>FF0000</code>, <code>#GG0000</code>, <code>#12345</code>, <code>#1234567</code>, <code>red</code></td>
</tr>
</tbody>
</table>

### Coordinate Format

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>coordinate:decimal</code> or <code>coordinate</code></td>
<td><code>/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/</code></td>
<td>Decimal latitude/longitude coordinates</td>
<td><code>40.7128,-74.0060</code>, <code>0,0</code>, <code>-90.0,180.0</code>, <code>39.9042,116.4074</code></td>
<td><code>40.7128</code>, <code>40.7128,-74.0060,123</code>, <code>abc,def</code>, <code>40.7128, -74.0060</code></td>
</tr>
<tr>
<td><code>coordinate:dms</code></td>
<td><code>/^\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?"[NS],\d{1,3}°\d{1,2}'\d{1,2}(\.\d+)?"[EW]$/</code></td>
<td>Degrees-minutes-seconds coordinate format</td>
<td><code>40°42'46"N,74°0'21"W</code>, <code>0°0'0"N,0°0'0"E</code></td>
<td><code>40°42'46"N</code>, <code>40°42'46"N,74°0'21"</code>, <code>40°42'46",74°0'21"</code></td>
</tr>
</tbody>
</table>

### File and Format Validation

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>fileExtension:common</code> or <code>fileExtension</code></td>
<td><code>/^\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar|mp4|mp3|avi)$/i</code></td>
<td>Common file extensions</td>
<td><code>.jpg</code>, <code>.PDF</code>, <code>.docx</code>, <code>.mp4</code>, <code>.txt</code>, <code>.zip</code></td>
<td><code>.</code>, <code>jpg</code>, <code>.exe</code>, <code>.unknown</code>, <code>.js.map</code></td>
</tr>
<tr>
<td><code>fileExtension:image</code></td>
<td><code>/^\.(jpg|jpeg|png|gif|bmp|webp|svg|ico)$/i</code></td>
<td>Image file extensions</td>
<td><code>.jpg</code>, <code>.PNG</code>, <code>.gif</code>, <code>.svg</code>, <code>.webp</code></td>
<td><code>.pdf</code>, <code>.doc</code>, <code>.mp4</code>, <code>.txt</code></td>
</tr>
<tr>
<td><code>httpStatus:standard</code> or <code>httpStatus</code></td>
<td><code>/^[1-5]\d{2}$/</code></td>
<td>HTTP status codes (100-599)</td>
<td><code>200</code>, <code>404</code>, <code>500</code>, <code>301</code>, <code>403</code></td>
<td><code>99</code>, <code>600</code>, <code>1000</code>, <code>abc</code>, <code>20</code></td>
</tr>
<tr>
<td><code>timezone:offset</code></td>
<td><code>/^UTC[+-]([0-9]|1[0-2])(:30)?$|^UTC$/</code></td>
<td>UTC timezone offset format</td>
<td><code>UTC</code>, <code>UTC+8</code>, <code>UTC-5</code>, <code>UTC+9:30</code>, <code>UTC-12</code></td>
<td><code>UTC+15</code>, <code>UTC-13</code>, <code>GMT+8</code>, <code>UTC+8:45</code></td>
</tr>
<tr>
<td><code>languageCode:iso</code> or <code>languageCode</code></td>
<td><code>/^[a-z]{2}(-[A-Z]{2})?$/</code></td>
<td>ISO 639 language code (with optional country code)</td>
<td><code>en</code>, <code>zh-CN</code>, <code>ja-JP</code>, <code>fr-FR</code>, <code>es</code></td>
<td><code>ENG</code>, <code>zh_CN</code>, <code>chinese</code>, <code>en-us</code>, <code>123</code></td>
</tr>
</tbody>
</table>

### Temperature and Measurement

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>temperature:celsius</code> or <code>temperature</code></td>
<td><code>/^-?\d+(\.\d+)?°?C$/i</code></td>
<td>Temperature format</td>
<td><code>25°C</code>, <code>-10.5°C</code>, <code>98.6°F</code>, <code>0°C</code></td>
<td><code>25C</code>, <code>25°</code>, <code>25°K</code>, <code>abc°C</code></td>
</tr>
<tr>
<td><code>measurement:length</code> or <code>measurement</code></td>
<td><code>/^\d+(\.\d+)?\s?(mm|cm|m|km|in|ft|yd|mi)$/</code></td>
<td>Length measurement units</td>
<td><code>10mm</code>, <code>5.5cm</code>, <code>100 m</code>, <code>1.5 km</code></td>
<td><code>10</code>, <code>5.5 cm2</code>, <code>abc mm</code>, <code>10 meter</code></td>
</tr>
</tbody>
</table>

---

## Security Related (Security)

### Password Strength

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>password:basic</code> or <code>password</code></td>
<td><code>/^.{6,}$/</code></td>
<td>Basic password strength (at least 6 characters)</td>
<td><code>password123</code>, <code>myPass456</code>, <code>123456</code></td>
<td><code>123</code>, <code>pass</code>, <code>12345</code></td>
</tr>
<tr>
<td><code>password:medium</code></td>
<td><code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/</code></td>
<td>Medium password strength (uppercase + lowercase + numbers, 8+ chars)</td>
<td><code>Password123</code>, <code>MyPass456</code>, <code>Abc12345</code></td>
<td><code>password123</code>, <code>PASSWORD123</code>, <code>12345678</code>, <code>Password</code></td>
</tr>
<tr>
<td><code>password:strong</code></td>
<td><code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/</code></td>
<td>Strong password strength (uppercase + lowercase + numbers + special chars, 8+ chars)</td>
<td><code>MyPass123!</code>, <code>Secure@2024</code>, <code>Strong$Pass1</code></td>
<td><code>password</code>, <code>12345678</code>, <code>PASSWORD</code>, <code>MyPass123</code></td>
</tr>
<tr>
<td><code>password:complex</code></td>
<td><code>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[^a-zA-Z\d@$!%*?&]).{12,}$/</code></td>
<td>Complex password strength (all character types, 12+ chars)</td>
<td><code>MyPass123!#Complex</code>, <code>Secure@2024~Strong</code>, <code>Strong$Pass1#Extra</code>, <code>Complex&Pass123~</code></td>
<td><code>MyPass123!</code>, <code>Secure@2024</code>, <code>password123</code>, <code>SHORT!1#</code>, <code>NoSpecial123</code></td>
</tr>
</tbody>
</table>

### API Keys

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>apiKey:standard</code> or <code>apiKey</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i</code></td>
<td>UUID format API key</td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>, <code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code></td>
<td><code>550e8400-e29b-41d4-a716</code>, <code>invalid-uuid</code>, <code>550e8400e29b41d4a716446655440000</code></td>
</tr>
<tr>
<td><code>apiKey:hex32</code></td>
<td><code>/^[a-f0-9]{32}$/i</code></td>
<td>32-character hexadecimal API key</td>
<td><code>5d41402abc4b2a76b9719d911017c592</code>, <code>098f6bcd4621d373cade4e832627b4f6</code></td>
<td><code>5d41402abc4b2a76b9719d911017c59</code>, <code>5d41402abc4b2a76b9719d911017c5921</code>, <code>GH41402abc4b2a76b9719d911017c592</code></td>
</tr>
<tr>
<td><code>apiKey:base64</code></td>
<td><code>/^[A-Za-z0-9+/]{32,}={0,2}$/</code></td>
<td>Base64 format API key</td>
<td><code>SGVsbG8gV29ybGQhIFRoaXMgaXMgYSB0ZXN0</code>, <code>dGVzdCBhcGkga2V5IGZvciBkZW1vbnN0cmF0aW9u</code></td>
<td><code>SGVsbG8=</code>, <code>invalid base64!</code>, <code>SGVsbG8gV29ybGQ===</code></td>
</tr>
</tbody>
</table>

### Token Format

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>token:jwt</code> or <code>token</code></td>
<td><code>/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/</code></td>
<td>JWT token format (three-part structure)</td>
<td><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></td>
<td><code>invalid.jwt</code>, <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</code>, <code>token</code></td>
</tr>
<tr>
<td><code>token:bearer</code></td>
<td><code>/^Bearer\s[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/</code></td>
<td>Bearer token format (HTTP authorization header)</td>
<td><code>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></td>
<td><code>bearer token</code>, <code>Bearer token</code>, <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></td>
</tr>
</tbody>
</table>

### Hash Values

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>hash:md5</code> or <code>hash</code></td>
<td><code>/^[a-f0-9]{32}$/i</code></td>
<td>MD5 hash value (32-character hexadecimal)</td>
<td><code>5d41402abc4b2a76b9719d911017c592</code>, <code>098f6bcd4621d373cade4e832627b4f6</code></td>
<td><code>5d41402abc4b2a76b9719d911017c59</code>, <code>5d41402abc4b2a76b9719d911017c5921</code>, <code>GH41402abc4b2a76b9719d911017c592</code></td>
</tr>
<tr>
<td><code>hash:sha1</code></td>
<td><code>/^[a-f0-9]{40}$/i</code></td>
<td>SHA1 hash value (40-character hexadecimal)</td>
<td><code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d</code>, <code>da39a3ee5e6b4b0d3255bfef95601890afd80709</code></td>
<td><code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434</code>, <code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d1</code>, <code>GHf4c61ddcc5e8a2dabede0f3b482cd9aea9434d</code></td>
</tr>
<tr>
<td><code>hash:sha256</code></td>
<td><code>/^[a-f0-9]{64}$/i</code></td>
<td>SHA256 hash value (64-character hexadecimal)</td>
<td><code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>, <code>2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae</code></td>
<td><code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85</code>, <code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8551</code>, <code>GHb0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></td>
</tr>
<tr>
<td><code>hash:sha512</code></td>
<td><code>/^[a-f0-9]{128}$/i</code></td>
<td>SHA512 hash value (128-character hexadecimal)</td>
<td><code>cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e</code></td>
<td><code>cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3</code>, <code>cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e1</code></td>
</tr>
</tbody>
</table>

---

## Geographic Location (Location)

### Postal Code

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>zipCode:CN</code> or <code>zipCode</code></td>
<td><code>/^[1-9]\d{5}$/</code></td>
<td>Chinese postal code</td>
<td><code>100000</code>, <code>200000</code>, <code>518000</code></td>
<td><code>000000</code>, <code>12345</code>, <code>1234567</code>, <code>abc123</code></td>
</tr>
<tr>
<td><code>zipCode:US</code></td>
<td><code>/^\d{5}(-\d{4})?$/</code></td>
<td>US postal code</td>
<td><code>12345</code>, <code>12345-6789</code>, <code>90210</code></td>
<td><code>1234</code>, <code>123456</code>, <code>12345-678</code>, <code>abcde</code></td>
</tr>
<tr>
<td><code>zipCode:UK</code></td>
<td><code>/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i</code></td>
<td>UK postal code format</td>
<td><code>M1 1AA</code>, <code>B33 8TH</code>, <code>W1A 0AX</code>, <code>EC1A 1BB</code>, <code>SW1A 1AA</code></td>
<td><code>M1</code>, <code>1AA</code>, <code>M1 1AAA</code>, <code>Z99 9ZZ</code>, <code>123 456</code></td>
</tr>
</tbody>
</table>

### Address Information

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>address:standard</code> or <code>address</code></td>
<td><code>/^.{5,100}$/</code></td>
<td>Address format</td>
<td><code>123 Main St, New York</code>, <code>456 Oak Avenue, Los Angeles</code></td>
<td><code>Short</code>, <code></code></td>
</tr>
<tr>
<td><code>city:name</code> or <code>city</code></td>
<td><code>/^[a-zA-Z\u4e00-\u9fa5\s\-']{2,50}$/</code></td>
<td>City name</td>
<td><code>New York</code>, <code>San Francisco</code>, <code>Los Angeles</code>, <code>St. Louis</code></td>
<td><code>A</code>, <code>City123</code>, <code>City@Name</code></td>
</tr>
<tr>
<td><code>country:name</code> or <code>country</code></td>
<td><code>/^[A-Z]{2}$/</code></td>
<td>Country code (ISO 3166-1)</td>
<td><code>US</code>, <code>CN</code>, <code>UK</code>, <code>JP</code></td>
<td><code>us</code>, <code>USA</code>, <code>CHN</code>, <code>123</code></td>
</tr>
<tr>
<td><code>state:name</code> or <code>state</code></td>
<td><code>/^[a-zA-Z\u4e00-\u9fa5\s\-']{2,50}$/</code></td>
<td>State/province name</td>
<td><code>California</code>, <code>New York</code>, <code>Texas</code></td>
<td><code>A</code>, <code>State123</code>, <code>State@Name</code></td>
</tr>
</tbody>
</table>

## Business Validation (Business)

### Business License

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>businessLicense:CN</code> or <code>businessLicense</code></td>
<td><code>/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/</code></td>
<td>Chinese business license number</td>
<td><code>91110000000000000X</code>, <code>91110000000000001A</code>, <code>91110000000000002B</code>, <code>91110000000000003C</code></td>
<td><code>9111000000000000</code>, <code>91110000000000000XI</code>, <code>G1110000000000000X</code>, <code>91110000000000000</code>, <code>911100000000000001</code></td>
</tr>
</tbody>
</table>

### Tax Registration Number

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>taxId:CN</code> or <code>taxId</code></td>
<td><code>/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/</code></td>
<td>Chinese tax registration number</td>
<td><code>91110000000000000X</code>, <code>91110000000000001A</code>, <code>91110000000000002B</code>, <code>91110000000000003C</code></td>
<td><code>9111000000000000</code>, <code>91110000000000000XI</code>, <code>G1110000000000000X</code>, <code>91110000000000000</code>, <code>911100000000000001</code></td>
</tr>
<tr>
<td><code>taxId:US</code></td>
<td><code>/^\d{2}-\d{7}$/</code></td>
<td>US tax number (EIN)</td>
<td><code>12-3456789</code>, <code>98-7654321</code>, <code>45-1234567</code>, <code>77-9876543</code></td>
<td><code>123456789</code>, <code>12-345678</code>, <code>12-34567890</code>, <code>1-2345678</code>, <code>123-456789</code></td>
</tr>
</tbody>
</table>

### Organization Code

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>organizationCode:CN</code> or <code>organizationCode</code></td>
<td><code>/^[A-Z0-9]{8}-[A-Z0-9]$/</code></td>
<td>Chinese organization code</td>
<td><code>12345678-X</code>, <code>ABCD1234-5</code></td>
<td><code>12345678</code>, <code>12345678-</code>, <code>12345678-XY</code></td>
</tr>
</tbody>
</table>

### Invoice Number

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>invoice:CN</code> or <code>invoice</code></td>
<td><code>/^\d{8,12}$/</code></td>
<td>Chinese invoice number</td>
<td><code>12345678</code>, <code>123456789012</code>, <code>987654321</code></td>
<td><code>1234567</code>, <code>1234567890123</code>, <code>abc12345678</code></td>
</tr>
</tbody>
</table>

### Company Name

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>companyName:standard</code> or <code>companyName</code></td>
<td><code>/^.{2,100}$/</code></td>
<td>Standard company name format</td>
<td><code>Apple Inc.</code>, <code>Google LLC</code>, <code>Microsoft Corporation</code></td>
<td><code>A</code>, <code></code></td>
</tr>
<tr>
<td><code>companyName:strict</code></td>
<td><code>/^[a-zA-Z0-9\u4e00-\u9fa5\s\.,&()-]{2,100}$/</code></td>
<td>Strict company name format</td>
<td><code>Apple Inc.</code>, <code>AT&T Corp.</code>, <code>Johnson & Johnson</code></td>
<td><code>Company@Name</code>, <code>Company#Name</code>, <code>A</code></td>
</tr>
</tbody>
</table>

### Stock Code

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>stockCode:CN</code> or <code>stockCode</code></td>
<td><code>/^(00|30|60|68)\d{4}$/</code></td>
<td>Chinese stock code</td>
<td><code>000001</code>, <code>300001</code>, <code>600001</code>, <code>688001</code></td>
<td><code>123456</code>, <code>700001</code>, <code>00001</code>, <code>0000001</code></td>
</tr>
<tr>
<td><code>stockCode:US</code></td>
<td><code>/^[A-Z]{1,5}$/</code></td>
<td>US stock code</td>
<td><code>AAPL</code>, <code>GOOGL</code>, <code>MSFT</code>, <code>TSLA</code>, <code>A</code></td>
<td><code>aapl</code>, <code>AAAAAA</code>, <code>123ABC</code>, <code>A1</code></td>
</tr>
<tr>
<td><code>stockCode:HK</code></td>
<td><code>/^\d{4,5}$/</code></td>
<td>Hong Kong stock code</td>
<td><code>0001</code>, <code>00700</code>, <code>09988</code>, <code>03690</code></td>
<td><code>1</code>, <code>123</code>, <code>123456</code>, <code>A001</code></td>
</tr>
</tbody>
</table>

### Employee ID

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>employeeId:standard</code> or <code>employeeId</code></td>
<td><code>/^EMP\d{6}$/</code></td>
<td>Standard employee ID: EMP + 6 digits</td>
<td><code>EMP123456</code>, <code>EMP000001</code>, <code>EMP999999</code></td>
<td><code>emp123456</code>, <code>EMP12345</code>, <code>EMP1234567</code>, <code>123456</code></td>
</tr>
<tr>
<td><code>employeeId:legacy</code></td>
<td><code>/^[A-Z]{2}\d{4}$/</code></td>
<td>Legacy employee ID: 2 uppercase letters + 4 digits</td>
<td><code>AB1234</code>, <code>XY9999</code>, <code>AA0001</code></td>
<td><code>ab1234</code>, <code>A1234</code>, <code>ABC123</code>, <code>AB12345</code></td>
</tr>
</tbody>
</table>

---

## Social Platforms (Social)

### Chinese Social Platforms

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>qq:number</code> or <code>qq</code></td>
<td><code>/^[1-9][0-9]{4,10}$/</code></td>
<td>QQ number</td>
<td><code>12345</code>, <code>123456789</code>, <code>1234567890</code></td>
<td><code>1234</code>, <code>01234567890</code>, <code>abc12345</code>, <code>12345678901</code></td>
</tr>
<tr>
<td><code>wechat:id</code> or <code>wechat</code></td>
<td><code>/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/</code></td>
<td>WeChat ID</td>
<td><code>wxid_abc123</code>, <code>user_name123</code>, <code>test-user</code></td>
<td><code>123abc</code>, <code>a</code>, <code>user@name</code>, <code>user name</code></td>
</tr>
<tr>
<td><code>weibo:username</code> or <code>weibo</code></td>
<td><code>/^[a-zA-Z0-9_-]{4,30}$/</code></td>
<td>Weibo username</td>
<td><code>user123</code>, <code>test_user</code>, <code>my-weibo</code></td>
<td><code>usr</code>, <code>user@name</code>, <code>user name</code>, <code>123456789012345678901234567890123</code></td>
</tr>
<tr>
<td><code>douyin:id</code> or <code>douyin</code></td>
<td><code>/^[a-zA-Z0-9._-]{1,24}$/</code></td>
<td>Douyin (TikTok) ID</td>
<td><code>user123</code>, <code>test.user</code>, <code>my_douyin</code>, <code>a</code></td>
<td><code>user@name</code>, <code>user name</code>, <code>12345678901234567890123456</code></td>
</tr>
</tbody>
</table>

### International Social Platforms

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>linkedin:profile</code> or <code>linkedin</code></td>
<td><code>/^[a-zA-Z0-9-]{3,100}$/</code></td>
<td>LinkedIn username</td>
<td><code>john-doe</code>, <code>user123</code>, <code>my-profile</code></td>
<td><code>jo</code>, <code>user_name</code>, <code>user@name</code>, <code>user.name</code></td>
</tr>
<tr>
<td><code>twitter:handle</code> or <code>twitter</code></td>
<td><code>/^[a-zA-Z0-9_]{1,15}$/</code></td>
<td>Twitter username</td>
<td><code>user123</code>, <code>test_user</code>, <code>a</code></td>
<td><code>user-name</code>, <code>user@name</code>, <code>1234567890123456</code></td>
</tr>
<tr>
<td><code>instagram:username</code> or <code>instagram</code></td>
<td><code>/^[a-zA-Z0-9._]{1,30}$/</code></td>
<td>Instagram username</td>
<td><code>user123</code>, <code>test.user</code>, <code>my_insta</code></td>
<td><code>user-name</code>, <code>user@name</code>, <code>1234567890123456789012345678901</code></td>
</tr>
<tr>
<td><code>facebook:username</code> or <code>facebook</code></td>
<td><code>/^[a-zA-Z0-9.]{5,50}$/</code></td>
<td>Facebook username</td>
<td><code>john.doe</code>, <code>user123</code>, <code>test.user</code></td>
<td><code>user</code>, <code>user-name</code>, <code>user@name</code>, <code>12345678901234567890123456789012345678901234567890123</code></td>
</tr>
</tbody>
</table>

### YouTube

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>youtube:channel</code> or <code>youtube</code></td>
<td><code>/^UC[a-zA-Z0-9_-]{22}$/</code></td>
<td>YouTube channel ID</td>
<td><code>UCuAXFkgsw1L7xaCfnd5JJOw</code>, <code>UC1234567890123456789012</code></td>
<td><code>UC123</code>, <code>YC1234567890123456789012</code>, <code>UCuAXFkgsw1L7xaCfnd5JJOwX</code></td>
</tr>
<tr>
<td><code>youtube:handle</code></td>
<td><code>/^@[a-zA-Z0-9._-]{3,30}$/</code></td>
<td>YouTube username</td>
<td><code>@username</code>, <code>@test.user</code>, <code>@my_channel</code></td>
<td><code>username</code>, <code>@us</code>, <code>@user@name</code>, <code>@12345678901234567890123456789012</code></td>
</tr>
</tbody>
</table>

### GitHub

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>github:username</code> or <code>github</code></td>
<td><code>/^[a-zA-Z0-9]([a-zA-Z0-9-]){0,38}$/</code></td>
<td>GitHub username</td>
<td><code>username</code>, <code>test-user</code>, <code>user123</code></td>
<td><code>-username</code>, <code>user-</code>, <code>1234567890123456789012345678901234567890</code></td>
</tr>
<tr>
<td><code>github:repo</code></td>
<td><code>/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/</code></td>
<td>GitHub repository name</td>
<td><code>user/repo</code>, <code>test-user/my-project</code>, <code>org/awesome.tool</code></td>
<td><code>user</code>, <code>user/</code>, <code>/repo</code>, <code>user repo/test</code></td>
</tr>
</tbody>
</table>

---

## Technical Related (Tech)

### Version Numbers

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>version:semver</code> or <code>version</code></td>
<td><code>/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/</code></td>
<td>Semantic version number (major.minor.patch)</td>
<td><code>1.0.0</code>, <code>2.1.3</code>, <code>1.0.0-alpha</code>, <code>1.0.0-alpha.1</code>, <code>1.0.0+20130313144700</code></td>
<td><code>1.0</code>, <code>1.0.0.0</code>, <code>v1.0.0</code>, <code>1.0.0-</code>, <code>1.0.0+</code></td>
</tr>
<tr>
<td><code>version:simple</code></td>
<td><code>/^v?\d+(\.\d+)*$/</code></td>
<td>Simple version number format (with optional v prefix)</td>
<td><code>1.0</code>, <code>2.1.3</code>, <code>v1.0.0</code>, <code>1.2.3.4</code></td>
<td><code>1.0.0-alpha</code>, <code>version</code>, <code>1.0.</code>, <code>.1.0</code></td>
</tr>
</tbody>
</table>

### UUID

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>uuid:v4</code> or <code>uuid</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i</code></td>
<td>UUID version 4 (randomly generated)</td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>, <code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code></td>
<td><code>550e8400-e29b-41d4-a716</code>, <code>invalid-uuid</code>, <code>550e8400e29b41d4a716446655440000</code></td>
</tr>
<tr>
<td><code>uuid:v1</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i</code></td>
<td>UUID version 1 (based on time and MAC address)</td>
<td><code>550e8400-e29b-11d4-a716-446655440000</code></td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>, <code>invalid-uuid</code></td>
</tr>
<tr>
<td><code>uuid:any</code></td>
<td><code>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i</code></td>
<td>Any UUID format (version agnostic)</td>
<td><code>550e8400-e29b-41d4-a716-446655440000</code>, <code>550e8400-e29b-11d4-a716-446655440000</code></td>
<td><code>550e8400-e29b-41d4-a716</code>, <code>invalid-uuid</code></td>
</tr>
</tbody>
</table>

### MAC Address

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mac:address</code> or <code>mac</code></td>
<td><code>/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/</code></td>
<td>MAC address (colon or hyphen separated)</td>
<td><code>00:1B:44:11:3A:B7</code>, <code>00-1B-44-11-3A-B7</code>, <code>FF:FF:FF:FF:FF:FF</code></td>
<td><code>00:1B:44:11:3A</code>, <code>00:1B:44:11:3A:B7:C8</code>, <code>GG:1B:44:11:3A:B7</code></td>
</tr>
<tr>
<td><code>mac:dot</code></td>
<td><code>/^([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4}$/</code></td>
<td>MAC address (dot separated format)</td>
<td><code>001B.4411.3AB7</code>, <code>FFFF.FFFF.FFFF</code></td>
<td><code>00:1B:44:11:3A:B7</code>, <code>001B.4411.3AB</code>, <code>001B.4411.3AB7.C8</code></td>
</tr>
<tr>
<td><code>mac:plain</code></td>
<td><code>/^[0-9A-Fa-f]{12}$/</code></td>
<td>MAC address (no separator format)</td>
<td><code>001B44113AB7</code>, <code>FFFFFFFFFFFF</code></td>
<td><code>001B:44:11:3A:B7</code>, <code>001B44113AB</code>, <code>001B44113AB7C8</code></td>
</tr>
</tbody>
</table>

### Other Technical Formats

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>slug:url</code> or <code>slug</code></td>
<td><code>/^[a-z0-9]+(?:-[a-z0-9]+)*$/</code></td>
<td>URL slug format (hyphen separated)</td>
<td><code>hello-world</code>, <code>my-blog-post</code>, <code>test123</code></td>
<td><code>Hello-World</code>, <code>hello_world</code>, <code>hello-world-</code>, <code>-hello-world</code></td>
</tr>
<tr>
<td><code>slug:underscore</code></td>
<td><code>/^[a-z0-9]+(?:_[a-z0-9]+)*$/</code></td>
<td>URL slug format (underscore separated)</td>
<td><code>hello_world</code>, <code>my_blog_post</code>, <code>test123</code></td>
<td><code>Hello_World</code>, <code>hello-world</code>, <code>hello_world_</code>, <code>_hello_world</code></td>
</tr>
<tr>
<td><code>filename:standard</code> or <code>filename</code></td>
<td><code>/^[^<>:"/\\\\|?*\\x00-\\x1f]+$/</code></td>
<td>Standard filename (prohibits system reserved characters)</td>
<td><code>document.pdf</code>, <code>my file.txt</code>, <code>test-file.docx</code></td>
<td><code>file&lt;name.txt</code>, <code>file&gt;name.txt</code>, <code>file:name.txt</code>, <code>file|name.txt</code></td>
</tr>
<tr>
<td><code>filename:strict</code></td>
<td><code>/^[a-zA-Z0-9._-]+$/</code></td>
<td>Strict filename (letters, numbers, and some symbols only)</td>
<td><code>document.pdf</code>, <code>my-file.txt</code>, <code>test_123.jpg</code></td>
<td><code>file name.txt</code>, <code>file@name.txt</code>, <code>file with spaces.txt</code></td>
</tr>
<tr>
<td><code>base64:standard</code> or <code>base64</code></td>
<td><code>/^[A-Za-z0-9+/]*={0,2}$/</code></td>
<td>Base64 encoding format</td>
<td><code>SGVsbG8gV29ybGQ=</code>, <code>dGVzdA==</code>, <code>YWJjZGVmZw</code></td>
<td><code>SGVsbG8gV29ybGQ===</code>, <code>invalid base64!</code>, <code>SGVsbG8@V29ybGQ=</code></td>
</tr>
<tr>
<td><code>json:simple</code> or <code>json</code></td>
<td><code>/^\s*[\[{].*[\]}]\s*$/s</code></td>
<td>JSON format validation</td>
<td><code>{"key":"value"}</code>, <code>[1,2,3]</code>, <code>{"nested":{"data":true}}</code></td>
<td><code>{key:value}</code>, <code>invalid json</code>, <code>{"key":"value",}</code></td>
</tr>
<tr>
<td><code>htmlTag:standard</code> or <code>htmlTag</code></td>
<td><code>/^&lt;[a-zA-Z][a-zA-Z0-9]*\b[^&gt;]*&gt;.*?&lt;\/[a-zA-Z][a-zA-Z0-9]*&gt;$/s</code></td>
<td>HTML tag format</td>
<td><code>&lt;div&gt;content&lt;/div&gt;</code>, <code>&lt;p class="text"&gt;hello&lt;/p&gt;</code></td>
<td><code>&lt;div&gt;content</code>, <code>div&gt;content&lt;/div&gt;</code>, <code>&lt;123&gt;invalid&lt;/123&gt;</code></td>
</tr>
<tr>
<td><code>xpath:simple</code> or <code>xpath</code></td>
<td><code>/^\/(?:[a-zA-Z_][\w-]*(?:\[[^\]]*\])?(?:\/[a-zA-Z_][\w-]*(?:\[[^\]]*\])?)*)?$/</code></td>
<td>XPath expression</td>
<td><code>/html/body/div</code>, <code>//div[@class='content']</code>, <code>//*[@id='main']</code></td>
<td><code>html/body/div</code>, <code>/html//body</code>, <code>/123invalid</code></td>
</tr>
<tr>
<td><code>cssSelector:simple</code> or <code>cssSelector</code></td>
<td><code>/^[a-zA-Z#.][\w\s#.,:()[\]"'-]*$/</code></td>
<td>CSS selector</td>
<td><code>.class</code>, <code>#id</code>, <code>div.class</code>, <code>input[type="text"]</code></td>
<td><code>123invalid</code>, <code>.class{}</code>, <code>div &gt; p</code></td>
</tr>
<tr>
<td><code>regex:simple</code> or <code>regex</code></td>
<td><code>/^\/.*\/[gimuy]*$/</code></td>
<td>Regular expression format</td>
<td><code>/test/gi</code>, <code>/[a-z]+/</code>, <code>/^hello$/i</code></td>
<td><code>test</code>, <code>/test</code>, <code>test/</code>, <code>/test/xyz</code></td>
</tr>
<tr>
<td><code>cronExpression:standard</code> or <code>cronExpression</code></td>
<td><code>/^(\*|[0-5]?\d)(\s+(\*|[0-5]?\d)){4}$/</code></td>
<td>Cron expression</td>
<td><code>0 0 * * *</code>, <code>30 2 * * 1</code>, <code>0 */4 * * *</code></td>
<td><code>0 0 * *</code>, <code>60 0 * * *</code>, <code>0 0 32 * *</code></td>
</tr>
<tr>
<td><code>dockerImage:name</code> or <code>dockerImage</code></td>
<td><code>/^[a-z0-9]+(?:[._-][a-z0-9]+)*(?:\/[a-z0-9]+(?:[._-][a-z0-9]+)*)*(?::[a-zA-Z0-9._-]+)?$/</code></td>
<td>Docker image name</td>
<td><code>nginx</code>, <code>node:16</code>, <code>registry.com/user/app:latest</code></td>
<td><code>NGINX</code>, <code>node:</code>, <code>registry/user/app:</code></td>
</tr>
<tr>
<td><code>sqlQuery:select</code> or <code>sqlQuery</code></td>
<td><code>/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/i</code></td>
<td>SQL query statement</td>
<td><code>SELECT * FROM users</code>, <code>INSERT INTO table VALUES</code>, <code>UPDATE users SET name</code></td>
<td><code>SHOW TABLES</code>, <code>DESCRIBE table</code>, <code>invalid query</code></td>
</tr>
</tbody>
</table>

---

## Modern Scenarios (Modern)

### Git Version Control

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>git:commit</code> or <code>git</code></td>
<td><code>/^[a-f0-9]{7,40}$/</code></td>
<td>Git commit hash (7-40 characters)</td>
<td><code>a1b2c3d</code>, <code>1234567890abcdef</code>, <code>f47ac10b58cc4372a5670e02b2c3d479</code></td>
<td><code>123456</code>, <code>g1b2c3d</code>, <code>1234567890abcdef1234567890abcdef123456789</code></td>
</tr>
<tr>
<td><code>git:branch</code></td>
<td><code>/^[a-zA-Z0-9._/-]+$/</code></td>
<td>Git branch name</td>
<td><code>main</code>, <code>feature/login</code>, <code>hotfix-1.2.3</code>, <code>dev_branch</code></td>
<td><code>branch name</code>, <code>branch@name</code>, <code>branch#name</code></td>
</tr>
<tr>
<td><code>git:tag</code></td>
<td><code>/^v?\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/</code></td>
<td>Git tag (semantic versioning)</td>
<td><code>v1.0.0</code>, <code>1.2.3</code>, <code>v2.0.0-beta.1</code>, <code>1.0.0-alpha</code></td>
<td><code>version</code>, <code>v1.0</code>, <code>1.0.0.0</code>, <code>v1.0.0-</code></td>
</tr>
</tbody>
</table>

### Package Management

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>npm:package</code> or <code>npm</code></td>
<td><code>/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/</code></td>
<td>NPM package name</td>
<td><code>react</code>, <code>@types/node</code>, <code>my-package</code>, <code>@org/package-name</code></td>
<td><code>React</code>, <code>@/package</code>, <code>package name</code>, <code>package@version</code></td>
</tr>
<tr>
<td><code>pip:package</code> or <code>pip</code></td>
<td><code>/^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/</code></td>
<td>Python package name (PyPI)</td>
<td><code>requests</code>, <code>django-rest-framework</code>, <code>Pillow</code>, <code>numpy</code></td>
<td><code>-package</code>, <code>package-</code>, <code>package name</code>, <code>package@version</code></td>
</tr>
<tr>
<td><code>maven:artifact</code> or <code>maven</code></td>
<td><code>/^[a-zA-Z0-9._-]+:[a-zA-Z0-9._-]+$/</code></td>
<td>Maven artifact coordinates</td>
<td><code>org.springframework:spring-core</code>, <code>com.google.guava:guava</code></td>
<td><code>spring-core</code>, <code>org.springframework</code>, <code>org.springframework:spring-core:version</code></td>
</tr>
</tbody>
</table>

### Network Protocols

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>protocol:http</code> or <code>protocol</code></td>
<td><code>/^https?:\/\/.+$/</code></td>
<td>HTTP/HTTPS protocol URL</td>
<td><code>http://example.com</code>, <code>https://api.example.com/v1</code></td>
<td><code>ftp://example.com</code>, <code>example.com</code>, <code>http://</code></td>
</tr>
<tr>
<td><code>protocol:websocket</code></td>
<td><code>/^wss?:\/\/.+$/</code></td>
<td>WebSocket protocol URL</td>
<td><code>ws://localhost:8080</code>, <code>wss://api.example.com/ws</code></td>
<td><code>http://example.com</code>, <code>websocket://example.com</code></td>
</tr>
<tr>
<td><code>protocol:ftp</code></td>
<td><code>/^ftps?:\/\/.+$/</code></td>
<td>FTP/FTPS protocol URL</td>
<td><code>ftp://files.example.com</code>, <code>ftps://secure.example.com</code></td>
<td><code>http://example.com</code>, <code>ftp://</code></td>
</tr>
</tbody>
</table>

### Database and Storage

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mongodb:objectId</code> or <code>mongodb</code></td>
<td><code>/^[a-f0-9]{24}$/</code></td>
<td>MongoDB ObjectId</td>
<td><code>507f1f77bcf86cd799439011</code>, <code>123456789012345678901234</code></td>
<td><code>507f1f77bcf86cd79943901</code>, <code>507f1f77bcf86cd7994390111</code>, <code>GH7f1f77bcf86cd799439011</code></td>
</tr>
<tr>
<td><code>redis:key</code> or <code>redis</code></td>
<td><code>/^[a-zA-Z0-9:._-]+$/</code></td>
<td>Redis key format</td>
<td><code>user:123</code>, <code>session_token</code>, <code>cache:user:profile:456</code></td>
<td><code>user 123</code>, <code>user@123</code>, <code>user#123</code></td>
</tr>
<tr>
<td><code>sql:table</code> or <code>sql</code></td>
<td><code>/^[a-zA-Z_][a-zA-Z0-9_]*$/</code></td>
<td>SQL table/column name</td>
<td><code>users</code>, <code>user_profiles</code>, <code>UserTable</code>, <code>_temp</code></td>
<td><code>123users</code>, <code>user-profiles</code>, <code>user profiles</code>, <code>user@table</code></td>
</tr>
</tbody>
</table>

### Cloud Services

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>aws:s3</code> or <code>aws</code></td>
<td><code>/^s3:\/\/[a-z0-9.-]+\/.*$/</code></td>
<td>AWS S3 URI</td>
<td><code>s3://my-bucket/file.txt</code>, <code>s3://example-bucket/folder/file.pdf</code></td>
<td><code>s3://</code>, <code>s3://My-Bucket/file.txt</code>, <code>http://s3.amazonaws.com/bucket</code></td>
</tr>
<tr>
<td><code>gcp:storage</code> or <code>gcp</code></td>
<td><code>/^gs:\/\/[a-z0-9._-]+\/.*$/</code></td>
<td>Google Cloud Storage URI</td>
<td><code>gs://my-bucket/file.txt</code>, <code>gs://example_bucket/folder/file.pdf</code></td>
<td><code>gs://</code>, <code>gs://My-Bucket/file.txt</code>, <code>https://storage.googleapis.com/bucket</code></td>
</tr>
<tr>
<td><code>azure:blob</code> or <code>azure</code></td>
<td><code>/^https:\/\/[a-z0-9]+\.blob\.core\.windows\.net\/.*$/</code></td>
<td>Azure Blob Storage URL</td>
<td><code>https://mystorageaccount.blob.core.windows.net/container/file.txt</code></td>
<td><code>https://MyStorageAccount.blob.core.windows.net/container/file.txt</code>, <code>https://storage.blob.core.windows.net/container/file.txt</code></td>
</tr>
</tbody>
</table>

### Modern API and Data Formats

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>graphql:query</code> or <code>graphql</code></td>
<td><code>/^\s*(query|mutation|subscription)\s+\w+\s*\{/i</code></td>
<td>GraphQL query format</td>
<td><code>query GetUser { user { name } }</code>, <code>mutation CreateUser { createUser(input: $input) { id } }</code></td>
<td><code>{ user { name } }</code>, <code>SELECT * FROM users</code>, <code>query { user }</code></td>
</tr>
<tr>
<td><code>yaml:key</code> or <code>yaml</code></td>
<td><code>/^[a-zA-Z_][a-zA-Z0-9_-]*:\s*.+$/</code></td>
<td>YAML key-value pair</td>
<td><code>name: John Doe</code>, <code>port: 8080</code>, <code>database_url: postgres://localhost</code></td>
<td><code>123name: value</code>, <code>name value</code>, <code>name:</code></td>
</tr>
<tr>
<td><code>toml:section</code> or <code>toml</code></td>
<td><code>/^\[[\w.-]+\]$/</code></td>
<td>TOML section header</td>
<td><code>[database]</code>, <code>[server.http]</code>, <code>[tool.poetry]</code></td>
<td><code>database</code>, <code>[database</code>, <code>database]</code>, <code>[data base]</code></td>
</tr>
<tr>
<td><code>env:variable</code> or <code>env</code></td>
<td><code>/^[A-Z_][A-Z0-9_]*=.*$/</code></td>
<td>Environment variable</td>
<td><code>DATABASE_URL=postgres://localhost</code>, <code>PORT=8080</code>, <code>NODE_ENV=production</code></td>
<td><code>database_url=value</code>, <code>123PORT=8080</code>, <code>PORT 8080</code></td>
</tr>
</tbody>
</table>

### Internationalization and Multimedia

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i18n:key</code> or <code>i18n</code></td>
<td><code>/^[a-zA-Z0-9._-]+$/</code></td>
<td>Internationalization key</td>
<td><code>common.button.save</code>, <code>error_messages.required</code>, <code>nav-menu</code></td>
<td><code>common button save</code>, <code>error@messages</code>, <code>nav menu</code></td>
</tr>
<tr>
<td><code>locale:code</code> or <code>locale</code></td>
<td><code>/^[a-z]{2}(-[A-Z]{2})?(-[a-zA-Z0-9]+)*$/</code></td>
<td>Locale code (BCP 47)</td>
<td><code>en</code>, <code>zh-CN</code>, <code>en-US-POSIX</code>, <code>fr-CA</code></td>
<td><code>ENG</code>, <code>zh_CN</code>, <code>chinese</code>, <code>en-us</code></td>
</tr>
<tr>
<td><code>mime:type</code> or <code>mime</code></td>
<td><code>/^[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_.]*$/</code></td>
<td>MIME type</td>
<td><code>text/html</code>, <code>application/json</code>, <code>image/png</code>, <code>video/mp4</code></td>
<td><code>text</code>, <code>text/</code>, <code>/html</code>, <code>text html</code></td>
</tr>
<tr>
<td><code>charset:encoding</code> or <code>charset</code></td>
<td><code>/^[a-zA-Z0-9][a-zA-Z0-9\-]*$/</code></td>
<td>Character encoding</td>
<td><code>UTF-8</code>, <code>ISO-8859-1</code>, <code>ASCII</code>, <code>UTF-16</code></td>
<td><code>utf 8</code>, <code>UTF_8</code>, <code>-UTF-8</code>, <code>UTF-8-</code></td>
</tr>
</tbody>
</table>

### Kubernetes Resources

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>kubernetesResource:name</code> or <code>kubernetesResource</code></td>
<td><code>/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/</code></td>
<td>Kubernetes resource name (Pod, Service, etc.)</td>
<td><code>my-pod</code>, <code>web-service</code>, <code>app-123</code>, <code>nginx</code></td>
<td><code>My-Pod</code>, <code>web_service</code>, <code>-app</code>, <code>app-</code>, <code>APP</code></td>
</tr>
<tr>
<td><code>kubernetesResource:namespace</code></td>
<td><code>/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/</code></td>
<td>Kubernetes namespace</td>
<td><code>default</code>, <code>kube-system</code>, <code>my-namespace</code>, <code>prod-env</code></td>
<td><code>Default</code>, <code>kube_system</code>, <code>-namespace</code>, <code>namespace-</code></td>
</tr>
<tr>
<td><code>kubernetesResource:label</code></td>
<td><code>/^[a-zA-Z0-9]([-a-zA-Z0-9_.]*[a-zA-Z0-9])?$/</code></td>
<td>Kubernetes label key/value</td>
<td><code>app</code>, <code>app.kubernetes.io/name</code>, <code>version_1.0</code>, <code>env-prod</code></td>
<td><code>-app</code>, <code>app-</code>, <code>.app</code>, <code>app.</code></td>
</tr>
</tbody>
</table>

### Docker Containers

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>dockerContainerId:standard</code> or <code>dockerContainerId</code></td>
<td><code>/^[a-f0-9]{64}$/</code></td>
<td>Full Docker container ID (64-character hexadecimal)</td>
<td><code>a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456</code></td>
<td><code>a1b2c3d4e5f6</code>, <code>A1B2C3D4E5F6...</code>, <code>g1b2c3d4e5f6...</code></td>
</tr>
<tr>
<td><code>dockerContainerId:short</code></td>
<td><code>/^[a-f0-9]{12}$/</code></td>
<td>Short Docker container ID (12-character hexadecimal)</td>
<td><code>a1b2c3d4e5f6</code>, <code>1234567890ab</code>, <code>fedcba098765</code></td>
<td><code>a1b2c3d4e5f</code>, <code>A1B2C3D4E5F6</code>, <code>g1b2c3d4e5f6</code></td>
</tr>
</tbody>
</table>

---

## Miscellaneous (Misc)

### Character Types

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>chinese:character</code> or <code>chinese</code></td>
<td><code>/^[\u4e00-\u9fa5]+$/</code></td>
<td>Chinese characters</td>
<td><code>你好</code>, <code>世界</code>, <code>中文测试</code></td>
<td><code>hello</code>, <code>你好world</code>, <code>123</code></td>
</tr>
<tr>
<td><code>english:letter</code> or <code>english</code></td>
<td><code>/^[a-zA-Z]+$/</code></td>
<td>English letters only</td>
<td><code>hello</code>, <code>World</code>, <code>Test</code></td>
<td><code>hello123</code>, <code>你好</code>, <code>hello world</code></td>
</tr>
<tr>
<td><code>alphanumeric:standard</code> or <code>alphanumeric</code></td>
<td><code>/^[a-zA-Z0-9]+$/</code></td>
<td>Letters and numbers only</td>
<td><code>abc123</code>, <code>Test123</code>, <code>123abc</code></td>
<td><code>abc-123</code>, <code>abc 123</code>, <code>abc@123</code></td>
</tr>
<tr>
<td><code>unicode:emoji</code> or <code>emoji</code></td>
<td><code>/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u</code></td>
<td>Unicode emoji characters</td>
<td><code>😀</code>, <code>🌟</code>, <code>🚀</code>, <code>🇺🇸</code></td>
<td><code>:)</code>, <code>:-)</code>, <code>hello</code>, <code>123</code></td>
</tr>
</tbody>
</table>

### Identifiers

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>barcode:standard</code> or <code>barcode</code></td>
<td><code>/^\d{8,14}$/</code></td>
<td>Barcode</td>
<td><code>12345678</code>, <code>1234567890123</code></td>
<td><code>1234567</code>, <code>123456789012345</code>, <code>abc12345678</code></td>
</tr>
<tr>
<td><code>isbn:standard</code> or <code>isbn</code></td>
<td><code>/^(97[89])?\d{9}[\dX]$/</code></td>
<td>ISBN book number</td>
<td><code>9787111547426</code>, <code>123456789X</code>, <code>1234567890</code></td>
<td><code>123456789</code>, <code>97812345678901</code>, <code>abc123456789</code></td>
</tr>
<tr>
<td><code>imei:standard</code> or <code>imei</code></td>
<td><code>/^\d{15}$/</code></td>
<td>Mobile IMEI number</td>
<td><code>123456789012345</code>, <code>987654321098765</code></td>
<td><code>12345678901234</code>, <code>1234567890123456</code>, <code>abc123456789012</code></td>
</tr>
<tr>
<td><code>license:plate</code> or <code>license</code></td>
<td><code>/^[A-Z0-9]{8,32}$/</code></td>
<td>License number</td>
<td><code>ABC12345</code>, <code>LICENSE123456789</code></td>
<td><code>abc123</code>, <code>LICENSE@123</code>, <code>AB</code></td>
</tr>
<tr>
<td><code>lottery:number</code> or <code>lottery</code></td>
<td><code>/^\d{2}\+\d{2}$/</code></td>
<td>Lottery number</td>
<td><code>01+02</code>, <code>35+12</code>, <code>07+01</code></td>
<td><code>1+2</code>, <code>01-02</code>, <code>36+13</code>, <code>abc+def</code></td>
</tr>
</tbody>
</table>

---

## Transportation (Transport)

### Flight Information

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>flight:number</code> or <code>flight</code></td>
<td><code>/^[A-Z]{2,3}[0-9]{1,4}$/</code></td>
<td>Flight number</td>
<td><code>CA123</code>, <code>MU5678</code>, <code>CZ9999</code>, <code>AA1</code></td>
<td><code>ca123</code>, <code>C123</code>, <code>CA12345</code>, <code>123CA</code></td>
</tr>
<tr>
<td><code>flight:iata</code></td>
<td><code>/^[A-Z]{3}$/</code></td>
<td>IATA airport code</td>
<td><code>PEK</code>, <code>LAX</code>, <code>JFK</code>, <code>NRT</code></td>
<td><code>pek</code>, <code>PE</code>, <code>PEKX</code>, <code>123</code></td>
</tr>
<tr>
<td><code>flight:icao</code></td>
<td><code>/^[A-Z]{4}$/</code></td>
<td>ICAO airport code</td>
<td><code>ZBAA</code>, <code>KLAX</code>, <code>KJFK</code>, <code>RJAA</code></td>
<td><code>zbaa</code>, <code>ZBA</code>, <code>ZBAAX</code>, <code>1234</code></td>
</tr>
</tbody>
</table>

### Train Information

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>trainNumber:CN</code> or <code>trainNumber</code></td>
<td><code>/^[GCDZTYKL]\d{1,4}$/</code></td>
<td>Chinese train number</td>
<td><code>G123</code>, <code>D1234</code>, <code>T12</code>, <code>K9999</code></td>
<td><code>g123</code>, <code>A123</code>, <code>G12345</code>, <code>123G</code></td>
</tr>
</tbody>
</table>

### Logistics Information

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>trackingNumber:standard</code> or <code>trackingNumber</code></td>
<td><code>/^[A-Z]{2}\d{9}[A-Z]{2}$/</code></td>
<td>Express tracking number</td>
<td><code>SF1234567890AB</code>, <code>YT9876543210CD</code></td>
<td><code>sf1234567890ab</code>, <code>SF123456789AB</code>, <code>SF1234567890ABC</code></td>
</tr>
<tr>
<td><code>containerNumber:iso</code> or <code>containerNumber</code></td>
<td><code>/^[A-Z]{4}\d{7}$/</code></td>
<td>Container number</td>
<td><code>ABCD1234567</code>, <code>MSCU1234567</code></td>
<td><code>abcd1234567</code>, <code>ABC1234567</code>, <code>ABCD12345678</code></td>
</tr>
<tr>
<td><code>vehicleVin:standard</code> or <code>vehicleVin</code></td>
<td><code>/^[A-HJ-NPR-Z0-9]{17}$/</code></td>
<td>Vehicle Identification Number (VIN)</td>
<td><code>1HGBH41JXMN109186</code>, <code>JH4TB2H26CC000000</code></td>
<td><code>1hgbh41jxmn109186</code>, <code>1HGBH41JXMN10918</code>, <code>1HGBH41JXMN1091861</code></td>
</tr>
<tr>
<td><code>shipImo:number</code> or <code>shipImo</code></td>
<td><code>/^IMO\d{7}$/</code></td>
<td>Ship IMO number</td>
<td><code>IMO1234567</code>, <code>IMO9876543</code></td>
<td><code>imo1234567</code>, <code>IMO123456</code>, <code>IMO12345678</code></td>
</tr>
</tbody>
</table>

---

## Media Related (Media)

### Image Resources

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>imageUrl:standard</code> or <code>imageUrl</code></td>
<td><code>/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i</code></td>
<td>Image URL</td>
<td><code>https://example.com/image.jpg</code>, <code>http://site.com/pic.png?v=1</code></td>
<td><code>https://example.com/image.txt</code>, <code>image.jpg</code>, <code>ftp://site.com/pic.png</code></td>
</tr>
</tbody>
</table>

### Audio Resources

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>audioUrl:standard</code> or <code>audioUrl</code></td>
<td><code>/^https?:\/\/.+\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i</code></td>
<td>Audio URL</td>
<td><code>https://example.com/music.mp3</code>, <code>http://site.com/sound.wav?v=1</code></td>
<td><code>https://example.com/music.txt</code>, <code>music.mp3</code>, <code>ftp://site.com/audio.wav</code></td>
</tr>
</tbody>
</table>

### Video Resources

<table>
<thead>
<tr>
<th>Name</th>
<th>Regular Expression</th>
<th>Description</th>
<th>Valid Examples</th>
<th>Invalid Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>videoUrl:standard</code> or <code>videoUrl</code></td>
<td><code>/^https?:\/\/.+\.(mp4|avi|mov|wmv|flv|webm|mkv)(\?.*)?$/i</code></td>
<td>Video URL</td>
<td><code>https://example.com/video.mp4</code>, <code>http://site.com/movie.avi?v=1</code></td>
<td><code>https://example.com/video.txt</code>, <code>video.mp4</code>, <code>ftp://site.com/movie.avi</code></td>
</tr>
<tr>
<td><code>videoId:youtube</code> or <code>videoId</code></td>
<td><code>/^[a-zA-Z0-9_-]{11}$/</code></td>
<td>YouTube video ID</td>
<td><code>dQw4w9WgXcQ</code>, <code>jNQXAC9IVRw</code>, <code>9bZkp7q19f0</code></td>
<td><code>dQw4w9WgXc</code>, <code>dQw4w9WgXcQ1</code>, <code>invalid@id</code></td>
</tr>
</tbody>
</table>

---

## Usage Instructions

### Basic Usage

```javascript
import { rx } from 'regex-center';

// Use basic type (default group)
rx.test('test@example.com', 'email');  // true

// Use specific group
rx.test('test@example.com', 'email:strict');  // true

// Get regular expression
const emailRegex = rx.get('email');
console.log(emailRegex);  // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Group Syntax Description

- **Single Type**: Use type name directly, such as `email`, `phone`
- **Group Type**: Use `type:group` format, such as `email:strict`, `phone:CN`
- **Default Group**: Each type has a default group, used when no group is specified

### Notes

1. All regular expressions have been rigorously tested to ensure accuracy
2. Group names are case-sensitive
3. It is recommended to test thoroughly before using in production environment
4. Some complex regex may affect performance, please choose according to actual needs

---

## Complete Usage Guide

### 30-Second Quick Start

```bash
npm install regex-center
```

**Verify Installation**:
```javascript
import { rx } from 'regex-center';
console.log(rx.test('email', 'user@example.com')); // Should output: true
```

```javascript
import { rx } from 'regex-center';

// Get and validate
rx.get('email');                          // → /^[^\s@]+@[^\s@]+\.[^\s@]+$/
rx.get('phone:CN');                       // → /^1[3-9]\d{9}$/
rx.test('email', 'user@example.com');     // true
rx.test('phone:CN', '13800138000');       // true

// Group support
rx.test('password:strong', 'Password123!'); // Strong password
rx.test('email:enterprise', 'user@company.com'); // Enterprise email

// Text processing
const text = 'Contact: user@example.com, Phone: 13800138000';
rx.extractAll('phone:CN', text);          // ['13800138000']
rx.replaceAll('phone:CN', text, '[Phone]'); // → 'Contact: user@example.com, Phone: [Phone]'
rx.highlight('phone:CN', text, '<mark>$&</mark>');  // → 'Contact: user@example.com, Phone: <mark>13800138000</mark>'
```

### Group Syntax Description

| Syntax Format | Description | Example |
|---------------|-------------|---------|
| `type` | Use default group | `rx.test('text', 'email')` |
| `type:group` | Use specified group | `rx.test('text', 'phone:CN')` |
| `type:group:subgroup` | Use subgroup | `rx.test('text', 'bankCard:visa')` |

### Notes

1. All regular expressions have been rigorously tested for accuracy
2. Group names are case-sensitive
3. Thorough testing is recommended before production use
4. Some complex regex patterns may impact performance, choose based on actual needs

---

## Technical Support

### Frequently Asked Questions

**Q: How to customize regular expressions?**
```javascript
// Use rx.use() method to override default regexes
rx.use({
  email: /^[a-z0-9._%+-]+@company\.com$/,  // Only allow company email
  phone: {
    mobile: /^1[3-9]\d{9}$/,              // Mobile phone
    landline: /^0\d{2,3}-?\d{7,8}$/       // Landline
  }
});
```

### Contact Information

- **Issue Reports**: [GitHub Issues](https://github.com/SailingCoder/regex-center/issues)
- **Documentation**: [Official Documentation](https://github.com/SailingCoder/regex-center)

*This document covers all built-in regular expressions in Regex Center. For the latest version, please visit the [official repository](https://github.com/SailingCoder/regex-center).*
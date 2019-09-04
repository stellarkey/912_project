local curl = require "lcurl.safe"

script_info = {
	["title"] = "史莱姆",
	["description"] = "http://www.slimego.cn/",
	["version"] = "0.0.1",
}

function onSearch(key, page)
	local data = ""
	local c = curl.easy{
		url = "http://www.slimego.cn/search.html?q=" .. pd.urlEncode(key) .. "&rows=20&page=" .. page,
		followlocation = 1,
		timeout = 15,
		proxy = pd.getProxy(),
		writefunction = function(buffer)
			data = data .. buffer
			return #buffer
		end,
	}
	c:perform()
	c:close()
	return parse(data)
end

function onItemClick(item)
	return ACT_SHARELINK, item.url 
end

function parse(data)
	local result = {}
	local start = 1
	while true do
		local a, b, url, title, time = string.find(data, "<a rel=\"noreferrer\" href=\"(.-)\">(.-)</a>.-<span class=\"upload\">上传: (%d%d%d%d年%d%d月%d%d日)", start)
		if url == nil then
			break
		end
		title = string.gsub(title, "^%s*", "", 1)
		local tooltip = string.gsub(title, "<font color=\"red\">(.-)</font>", "%1")
		title = string.gsub(title, "<font color=\"red\">(.-)</font>", "{c #ff0000}%1{/c}")
		table.insert(result, {["url"] = url, ["title"] = title, ["time"] = time, ["showhtml"] = "true", ["tooltip"] = tooltip, ["check_url"] = "true"})
		start = b + 1
	end
	return result
end
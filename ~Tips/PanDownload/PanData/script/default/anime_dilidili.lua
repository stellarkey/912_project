local curl = require "lcurl.safe"

script_info = {
	["title"] = "嘀哩嘀哩",
	["description"] = "http://www.dilidili.name/",
	["version"] = "0.0.4",
}

function request(url)
	local r = ""
	local c = curl.easy{
		url = url,
		httpheader = {
			"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
		},
		ssl_verifyhost = 0,
		ssl_verifypeer = 0,
		followlocation = 1,
		timeout = 15,
		proxy = pd.getProxy(),
		writefunction = function(buffer)
			r = r .. buffer
			return #buffer
		end,
	}
	local _, e = c:perform()
	c:close()
	return r
end

function parse(data)
	local anime_week = {}
	local week = {"星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"}
	local sep = {"<!%-%- 星期一开始 %-%->", "<!%-%- 星期二开始 %-%->", "<!%-%- 星期三开始 %-%->", "<!%-%- 星期四开始 %-%->", "<!%-%- 星期五开始 %-%->", "<!%-%- 星期六开始 %-%->", "<!%-%- 星期日开始 %-%->", "<!%-%- seven end %-%->"}
	for i = 1, 7 do
		local _, _, tmp = string.find(data, sep[i] .. "(.-)" .. sep[i+1])
		local begin = 1
		local anime_day = {["title"] = week[i]}
		while tmp do
			local _, b, url, img, name = string.find(tmp, "<a href=\"(.-)\".-<img src=\"(.-)\".-<p>(.-)</p>", begin)
			if url == nil then
				break
			end
			if #url > 0 and string.byte(url) == 47 then
				url = "http://www.dilidili.name"..url
			end
			if #img > 0 and string.byte(img) == 47 then
				img = "http://www.dilidili.name"..img
			end
			table.insert(anime_day, {["url"] = url, ["name"] = name, ["image"] = img, ["icon_size"] = "55,55"})
			begin = b + 1
		end
		table.insert(anime_week, anime_day)
	end
	return anime_week
end

function onInitAnime()
	return parse(request("http://www.dilidili.name/"))
end

function onItemClick(item)
	local act = ACT_SHARELINK
	local _, _, arg, pwd = string.find(request(item.url), "<li class=\"list_xz\">.-(https?://pan.baidu.com/s/[A-Za-z0-9-_]+).->(.-)<.-<li>")
	if arg then
		arg = arg.." "..pwd
	else
		act = ACT_ERROR
		arg = "获取链接失败"
	end
	return act, arg 
end
script_info = {
	["title"] = "大小写转换",
	["description"] = "",
	["version"] = "0.0.1",
	["tooltip"] = "",
	["edit_count"] = "1",
	["edit_tips"] = "转大写填1，转小写留空",
}

function onRename(file, input)
	local name, ext = file.name, ""
	if file.isdir == false then
		_, _, name, ext = string.find(file.name, "(.*)(%.[^%.]*)$")
		if name == nil then
			name = file.name
			ext = ""
		end
	end
	if input[1] == "1" then
		return string.upper(name) .. ext
	else
		return string.lower(name) .. ext
	end
end
script_info = {
	["title"] = "修改扩展名",
	["description"] = "",
	["version"] = "0.0.1",
	["tooltip"] = "",
	["edit_count"] = "1",
	["edit_tips"] = "新扩展名",
}

function onRename(file, input)
	local name, ext = file.name, ""
	if file.isdir == false then
		_, _, name, ext = string.find(file.name, "(.*)(%.[^%.]*)$")
		if name ~= nil then
			name = name .. "." .. input[1]
		else
			name = file.name
		end
	end
	return name
end
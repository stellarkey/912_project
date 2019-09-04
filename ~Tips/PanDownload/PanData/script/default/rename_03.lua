script_info = {
	["title"] = "添加前后缀",
	["description"] = "",
	["version"] = "0.0.1",
	["tooltip"] = "",
	["edit_count"] = "2",
	["edit_tips"] = "前缀;后缀",
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
	return input[1] .. name .. input[2] .. ext
end
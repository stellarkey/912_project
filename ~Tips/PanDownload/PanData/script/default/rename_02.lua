script_info = {
	["title"] = "Lua模式匹配",
	["description"] = "",
	["version"] = "0.0.1",
	["tooltip"] = "",
	["edit_count"] = "3",
	["edit_tips"] = "模式串;替换串;替换次数",
}

function onRename(file, input)
	return (string.gsub(file.name, input[1], input[2], math.tointeger(input[3])))
end
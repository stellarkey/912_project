script_info = {
	["title"] = "关键字替换",
	["description"] = "",
	["version"] = "0.0.1",
	["tooltip"] = "",
	["edit_count"] = "2",				--输入框个数
	["edit_tips"] = "关键字;替换为",	--输入框提示，使用;号分隔
}

--[[
	重命名函数
	参数:
		file 文件信息
			file.name	文件名
			file.id		文件id
			file.path	文件路径
			file.size	文件大小
			file.mtime	文件修改时间
			file.isdir	是否为目录
		input 用户输入
	返回值:
		新文件名
--]]
function onRename(file, input)
	local i, j = string.find(file.name, input[1], 1, true)
	if i then
		file.name = string.sub(file.name, 1, i - 1) .. input[2] .. string.sub(file.name, j + 1)
	end
	return file.name
end
def len_2d(nums):
    count = 0
    for sub_list in nums:
        count += len(sub_list)
    return count

def group_numbers(nums, thres):
    if (len(nums) == 0):
        return []
    original_length = len(nums)
    result_list = []
    sub_list = []
    while(len_2d(result_list) < original_length):
        sub_list.append(nums[0])
        if(sum(sub_list) > thres):
            sub_list.pop(-1)
            result_list.append(sub_list)
            sub_list = []
        else:
            nums.pop(0)
            if(len(nums) == 0):
                result_list.append(sub_list)
    return result_list

 
print("# Test case 1 ##############")
print("Expected output:")
print([])
print("Your output: ")
print(group_numbers([], 6))

print("# Test case 2 ##############")
print("Expected output:")
print([[1,3,2], [4], [3,2], [3], [6]])
print("Your output: ")
print(group_numbers([1,3,2,4,3,2,3,6], 6))
import sys
# import os
while True:
    user_input = raw_input("Enter file name: ")
    if user_input == "assignment.txt":
        break
        
    elif user_input.lower() == "Give up!".lower():
        sys.exit()
        
    
# print os.path.abspath("/assignment.txt")        
# file = open(os.path.abspath(user_input), 'r')

# num_lines = open('/assignment.txt').read().count('\n')

# num_lines = open(os.path.abspath(user_input), 'r').read().count('\n') + 1
# print num_lines


with open(user_input, 'r') as f:
    lines = f.readlines()
    num_lines = len([l for l in lines if l.strip(' \n') != ''])
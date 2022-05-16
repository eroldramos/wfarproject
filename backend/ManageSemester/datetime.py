# # from datetime import date, timedelta

# # sdate = date(2008, 8, 15)   # start date
# # edate = date(2008, 9, 15)   # end date

# # delta = edate - sdate       # as timedelta

# # for i in range(delta.days + 1):
# #     day = sdate + timedelta(days=i)
# #     print(day)

# #import date function from datetime module
# # from datetime import date
# # #provide the 1st date in YYYY,MM,DD format
# # date1 = date(2022,5,15)
# # #provide the 1st date in YYYY,MM,DD format
# # date2 = date(2022,7,13)
    
# # #getting the result, abs = absolute value
# # #(date1-date2).days gives an integer number of dates
# # days = abs(date1-date2).days
# # #caculating and printing the weeks, // = floor division operator
# # print (days//7)
# import datetime
# strdate="2020-10-16" 
# datetimeobj=datetime.datetime.strptime(strdate, "%Y-%m-%d")
# datetimeobj
# print(datetimeobj.month)






# # from datetime import date, timedelta

# # sdate = date(2008, 8, 15)   # start date
# # edate = date(2008, 9, 15)   # end date

# # delta = edate - sdate       # as timedelta

# # for i in range(delta.days + 1):
# #     day = sdate + timedelta(days=i)
# #     print(day)

# #import date function from datetime module
# # from datetime import date
# # #provide the 1st date in YYYY,MM,DD format
# # date1 = date(2022,5,15)
# # #provide the 1st date in YYYY,MM,DD format
# # date2 = date(2022,7,13)
    
# # #getting the result, abs = absolute value
# # #(date1-date2).days gives an integer number of dates
# # days = abs(date1-date2).days
# # #caculating and printing the weeks, // = floor division operator
# # print (days//7)
# # import datetime
# # strdate="2022-05-16" 
# # datetimeobj=datetime.datetime.strptime(strdate, "%Y-%m-%d")
# # datetimeobj
# # print(datetimeobj.isoweekday())
# # print(datetime.datetime.now() + datetime.timedelta(days=7))

# from datetime import date, datetime, timedelta

# start_date = datetime.strptime("2022-05-15", "%Y-%m-%d")
# end_date = datetime.strptime("2022-07-15", "%Y-%m-%d")

# start_date = date(start_date.year, start_date.month, start_date.day)
# end_date = date(end_date.year, end_date.month, end_date.day)

# days= abs(end_date - start_date).days

# no_of_weeks = ((abs(end_date - start_date).days) // 7)

# print(no_of_weeks, days)
# weeks = []


# for i in range(no_of_weeks+1):
#     daysSetPerWeek = []

#     datePerDay =start_date =+timedelta(days=dates)
#     dayAfter = datePerDay.isoweekday()
#     if dayAfter == 7:
#         datePerDay =start_date =-timedelta(days=dayAfter)
#         print(datePerDay)
    
#     print(i)




# # week_bracket = [start_date, end_date]


# # #step 2
# # week_bracket[1] = start_date



# # step 3
# # for i in range(0, no_of_weeks + 2):
# #     week_bracket[1] += timedelta(days=7)

# #     succeeding_date_day = week_bracket[1].isoweekday()
# #     if succeeding_date_day != 7:
# #         week_bracket[1]-=timedelta(days=succeeding_date_day)
 

  
# #     week_bracket[0] = week_bracket[1] - timedelta(6)
# #     print( week_bracket, i)





      


# print(weeks)

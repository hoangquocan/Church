// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import StandardLayout from './layouts/StandardLayout/StandardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={StandardLayout}>
        <Route path="/activities" page={ActivityActivitiesPage} name="activities" />
        <Route path="/activities/new" page={ActivityNewActivityPage} name="newActivity" />
        <Route path="/activities/{id:Int}" page={ActivityActivityPage} name="activity" />

        <Route path="/reports" page={ReportReportsPage} name="reports" />
        <Route path="/report-info" page={ReportReportInfoPage} name="reportInfo" />

        <Route path="/attendance" page={AttendanceAttendancePage} name="attendance" />
        <Route path="/attendance/activity/{id:Int}" page={AttendanceActivityNotAttenPage} name="attendanceActivity" />

        <Route path="/members" page={MemberMembersPage} name="members" />
        <Route path="/members/new" page={MemberNewMemberPage} name="newMember" />
        <Route path="/member/{id:Int}" page={MemberMemberPage} name="member" />
        <Route path="/update-member/{id:Int}" page={MemberEditMemberPage} name="editMember" />

        {/* <Private unauthenticated="home"> */}
        <Route path="/groups" page={GroupGroupsPage} name="groups" />
        <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
        <Route path="/groups/{id:Int}" page={GroupGroupPage} name="group" />
        <Route path="/groups/{id:Int}/add-member" page={GroupGroupAddMemPage} name="groupAddMem" />
        {/* </Private> */}

        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

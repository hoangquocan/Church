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
        <Private unauthenticated="home" roles={'admin'}>
          <Route path="/admin" page={AdminPage} name="admin" />
        </Private>

        <Private unauthenticated="home" roles={['admin', 'manager']}>
          <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
          <Route path="/activities/new" page={ActivityNewActivityPage} name="newActivity" />
          <Route path="/manager/create-question" page={ManagerCreateQuestionPage} name="createQuestion" />
          {/* <Route path="/report" page={ReportReportPage} name="report" /> */}
        </Private>

        <Private unauthenticated="home" roles={['admin', 'manager', 'leader']}>
          <Route path="/activities/{id:Int}" page={ActivityActivityPage} name="activity" />
          <Route path="/activities" page={ActivityActivitiesPage} name="activities" />
          <Route path="/members" page={MemberMembersPage} name="members" />
          <Route path="/members/new" page={MemberNewMemberPage} name="newMember" />
          <Route path="/member/{id:Int}" page={MemberMemberPage} name="member" />
          <Route path="/update-member/{id:Int}" page={MemberEditMemberPage} name="editMember" />
          <Route path="/attendance" page={AttendanceAttendancePage} name="attendance" />
          <Route path="/attendance/activity/{id:Int}" page={AttendanceActivityNotAttenPage} name="attendanceActivity" />
          <Route path="/groups" page={GroupGroupsPage} name="groups" />
          <Route path="/groups/{id:Int}" page={GroupGroupPage} name="group" />
          <Route path="/groups/{id:Int,name:String}/add-member" page={GroupGroupAddMemPage} name="groupAddMem" />
          <Route path="/reports" page={ReportReportsPage} name="reports" />
          <Route path="/report-create" page={ReportReportCreatePage} name="reportCreate" />
          <Route path="/report-info" page={ReportReportInfoPage} name="reportInfo" />
        </Private>

        <Route path="/" page={HomePage} name="home" />
        <Route path="/{email:String}" page={UserProfilePage} name="userProfile" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

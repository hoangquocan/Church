import { Router, Route, Set, Private } from '@redwoodjs/router'

import StandardLayout from './layouts/StandardLayout/StandardLayout'
import UserLayout from './layouts/UserLayout/UserLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={UserLayout}>
        <Route path="/feedback" page={FeedbackAndHelpFeedbackPage} name="feedback" />
        <Route path="/contact" page={ContactPage} name="contact" />
      </Set>
      <Set wrap={StandardLayout}>
        <Private unauthenticated="home" roles={'admin'}>
          <Route path="/admin/set-role-user" page={AdminSetRoleUserPage} name="setRoleUser" />
          <Route path="/admin/manage-users" page={AdminManageUsersPage} name="manageUsers" />
          <Route path="/admin" page={AdminAdminPage} name="admin" />
        </Private>

        <Private unauthenticated="home" roles={['admin', 'manager']}>
          <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
          <Route path="/groups/{id:Int,name:String}/add-member" page={GroupGroupAddMemPage} name="groupAddMem" />
          <Route path="/activities/new" page={ActivityNewActivityPage} name="newActivity" />
          <Route path="/activities/new-multi-activities" page={ActivityNewMultiActivitiesPage} name="newMultiActivities" />
          <Route path="/manager/create-question" page={ManagerCreateQuestionPage} name="createQuestion" />
          <Route path="/manager/questions" page={ManagerQuestionsPage} name="questions" />
          <Route path="/manager/export-survey" page={ManagerExportSurveyPage} name="exportSurvey" />
          <Route path="/manager/import-file" page={ManagerImportFilePage} name="importFile" />
        </Private>

        <Private unauthenticated="home" roles={['admin', 'manager', 'leader']}>
          <Route path="/activities/{id:Int}" page={ActivityActivityPage} name="activity" />
          <Route path="/activities" page={ActivityActivitiesPage} name="activities" />
          <Route path="/members" page={MemberMembersPage} name="members" />
          <Route path="/member/new" page={MemberNewMemberPage} name="newMember" />
          <Route path="/member/{id:Int}" page={MemberMemberPage} name="member" />
          <Route path="/update-member/{id:Int}" page={MemberEditMemberPage} name="editMember" />
          <Route path="/attendance" page={AttendanceAttendancePage} name="attendance" />
          <Route path="/attendance/activity/{id:Int}" page={AttendanceActivityNotAttenPage} name="attendanceActivity" />
          <Route path="/attendanced" page={AttendanceAttendancedPage} name="attendanced" />
          <Route path="/groups" page={GroupGroupsPage} name="groups" />
          <Route path="/groups/{id:Int}" page={GroupGroupPage} name="group" />
          <Route path="/reports" page={ReportReportsPage} name="reports" />
          <Route path="/report-create" page={ReportReportCreatePage} name="reportCreate" />
          <Route path="/report-info" page={ReportReportInfoPage} name="reportInfo" />
          <Route path="/reports/viewreport" page={ReportReportPage} name="report" />
        </Private>
          <Route path="/" page={HomePage} name="home" />

        <Route path="/{email:String}" page={UserProfilePage} name="userProfile" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category',
        loadChildren: () => import('./category-manager/category-manager.module').then(m => m.CategoryManagerModule)
      },
      {
        path: 'class',
        loadChildren: () => import('./class-manager/class-manager.module').then(m => m.ClassManagerModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./post-manager/post-manager.module').then(m => m.PostManagerModule)
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher-manager/teacher-manager.module').then(m => m.TeacherManagerModule)
      },
      {
        path: 'topic',
        loadChildren: () => import('./topic-manager/topic-manager.module').then(m => m.TopicManagerModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student-manager/student-manager.module').then(m => m.StudentManagerModule)
      },
      {
        path: 'comment',
        loadChildren: () => import('./comment-manager/comment-manager.module').then(m => m.CommentManagerModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user-manager/user-manager.module').then(m => m.UserManagerModule)
      },
      {
        path: 'checkin',
        loadChildren: () => import('./checkin-manager/checkin-manager.module').then(m => m.CheckinManagerModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./baocao-thongke/baocao-thongke.module').then(m => m.BaocaoThongkeModule)
      },
      {
        path: 'register-online',
        loadChildren: () => import('./register-online-manager/register-online-manager.module').then(m => m.RegisterOnlineManagerModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact-manager/contact-manager.module').then(m => m.ContactManagerModule)
      },
      {
        path: 'subject',
        loadChildren: () => import('./subject-manager/subject.module').then(m => m.SubjectModule)
      },
      {
        path: 'points',
        loadChildren: () => import('./points-manager/points-manager.module').then(m => m.PointsManagerModule)
      }
    ]
  }
];
export const adminRoutes = RouterModule.forChild(routes);

export class Comment {
  id: string = '';
  trackId: string = '';
  userId: string = '';
  userName: string = '';
  userImage: string = '';
  text: string = '';
  parentCommentId: string | null = null;
  replies: Comment[] = [];
  createdAt: string = '';
}
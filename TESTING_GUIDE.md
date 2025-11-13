# 🧪 RADAR Education Center - Testing Guide

## Pre-Testing Setup

### 1. Login/Register Account
- Navigate to `/register`
- Create test account or login with existing account
- Verify email auto-confirmed (check Lovable Cloud auth settings)

### 2. Verify Database State
Check in Lovable Cloud → Database:
- `courses` table has active courses
- `course_modules` table has modules for test course
- `lessons` table has lessons for modules

---

## 📦 FLOW 1: Payment & Enrollment Testing

### Step 1: Browse & Select Course
**Actions:**
- [ ] Go to `/courses`
- [ ] Select a PAID course (not free)
- [ ] Click course card to view details at `/courses/:slug`
- [ ] Click "Enroll Now" or "Daftar Sekarang" button

**Expected:**
- Course details page loads properly
- Price displayed correctly
- CTA button redirects to `/checkout/:courseId`

---

### Step 2: Checkout Page
**Actions:**
- [ ] Verify checkout page loads with correct course info
- [ ] Check order summary shows:
  - Course title
  - Price
  - Total amount
- [ ] Click "Pay Now" button

**Expected:**
- Midtrans Snap popup appears
- Loading state shows while generating token
- No console errors

**Verify in Network Tab:**
- POST request to `/functions/v1/create-payment`
- Response includes `snap_token`
- Order created in `orders` table (status: `pending`)

---

### Step 3: Midtrans Payment Simulation
**Actions:**
- [ ] In Snap popup, select payment method
- [ ] Use Midtrans **SANDBOX** test credentials:

**Test Card Numbers:**
```
✅ Success Payment:
   Card: 4811 1111 1111 1114
   CVV: 123
   Expiry: 01/25

⏳ Pending Payment:
   Card: 4911 1111 1111 1113
   CVV: 123
   Expiry: 01/25

❌ Failed Payment:
   Card: 4411 1111 1111 1118
   CVV: 123
   Expiry: 01/25
```

**Expected:**
- Payment processes in sandbox mode
- Success callback triggered
- Redirected to `/payment-success`

---

### Step 4: Payment Webhook & Enrollment
**After successful payment:**

**Check Database (Lovable Cloud):**
- [ ] `orders` table:
  - Status changed to `paid`
  - `paid_at` timestamp populated
  - `midtrans_transaction_id` recorded
  - `payment_method` recorded

- [ ] `enrollments` table:
  - New record created automatically
  - `user_id` matches logged-in user
  - `course_id` matches purchased course
  - `status` = `active`
  - `progress` = `0`
  - `order_id` links to order

**Check Edge Function Logs:**
- Navigate to Lovable Cloud → Edge Functions → `payment-webhook`
- Look for successful webhook processing logs
- Verify enrollment creation log

---

### Step 5: Course Access Verification
**Actions:**
- [ ] Navigate to `/my-courses`
- [ ] Verify enrolled course appears in "In Progress" tab
- [ ] Click "Continue Learning" button
- [ ] Should redirect to `/learn/:courseId`

**Expected:**
- Course content loads successfully
- Sidebar shows all modules and lessons
- Video player loads first lesson
- Progress bar shows 0%
- No access denied errors

**Negative Test:**
- [ ] Try accessing `/learn/:differentCourseId` (not enrolled)
- [ ] Should redirect to `/courses/:slug` with error toast

---

## 📚 FLOW 2: Learning & Progress Testing

### Step 1: Video Playback & Navigation
**Actions:**
- [ ] Play video lesson
- [ ] Navigate using "Previous" and "Next" buttons
- [ ] Click different lessons in sidebar
- [ ] Verify active lesson highlighted in red/gradient

**Expected:**
- Video plays smoothly
- Lesson title and duration display correctly
- Sidebar updates active state
- Navigation buttons enable/disable correctly

---

### Step 2: Mark Lesson Complete
**Actions:**
- [ ] Watch/skip a lesson
- [ ] Click "Mark Complete" button
- [ ] Wait for success toast
- [ ] Observe lesson status in sidebar

**Expected:**
- Button text changes to "Completed"
- Green checkmark appears in sidebar
- Toast: "Progress Tersimpan"
- Auto-advances to next lesson after 1 second

**Check Database:**
- [ ] `lesson_progress` table:
  - New record created
  - `user_id` correct
  - `lesson_id` correct
  - `enrollment_id` correct
  - `completed` = `true`
  - `completed_at` timestamp set

- [ ] `enrollments` table:
  - `progress` percentage updated
  - Formula: (completed_lessons / total_lessons) * 100

---

### Step 3: Progress Tracking
**Actions:**
- [ ] Complete multiple lessons (at least 3)
- [ ] Verify progress bar updates in top nav
- [ ] Note current percentage

**Expected:**
- Progress bar animates smoothly
- Percentage calculation correct
- Updates happen immediately after marking complete

**Test Progress Calculation:**
```
Example: Course has 10 total lessons
- Complete 1 lesson → 10%
- Complete 5 lessons → 50%
- Complete 10 lessons → 100%
```

---

### Step 4: Dashboard Stats Update
**Actions:**
- [ ] Navigate to `/dashboard`
- [ ] Check "Courses Enrolled" stat
- [ ] Check "Courses Completed" stat (if 100% progress)
- [ ] Check "Hours Learned" stat
- [ ] Verify "Recent Activity" section

**Expected:**
- Stats reflect real database data
- "Courses Enrolled" = count of active enrollments
- "Courses Completed" = count of 100% progress enrollments
- Recent activity shows actual lesson completions

**Verify Database Queries:**
- All stats come from `enrollments` table
- No hardcoded/mock data
- Real-time updates after completing lessons

---

### Step 5: My Courses Page Verification
**Actions:**
- [ ] Navigate to `/my-courses`
- [ ] Verify "In Progress" tab shows enrolled course
- [ ] Check progress bar matches learning page
- [ ] Click "Continue Learning" → should go to last lesson

**Expected:**
- Course card shows correct:
  - Thumbnail
  - Title
  - Instructor
  - Progress percentage
  - Progress bar visual
- "Continue Learning" button functional
- If 100% complete → "View Certificate" button appears

---

### Step 6: Course Completion
**Actions:**
- [ ] Complete ALL lessons in a course (100%)
- [ ] Verify completion card appears in sidebar
- [ ] Check "Congratulations" message
- [ ] Click "Download Certificate" button

**Expected:**
- Completion card shows with green gradient
- Award icon displayed
- Button redirects to `/my-courses?tab=completed`
- Course appears in "Completed" tab

**Check Database:**
- [ ] `enrollments.progress` = `100`
- [ ] All lessons in `lesson_progress` have `completed = true`

---

## 🧪 Edge Cases & Error Handling

### Enrollment Validation
- [ ] Try to enroll in same course twice
  - Expected: Duplicate check in checkout
- [ ] Try to access `/learn/:id` without enrollment
  - Expected: Redirect to course detail with error

### Payment Errors
- [ ] Test failed payment (card 4411...)
  - Expected: Error toast, no enrollment created
- [ ] Test pending payment (card 4911...)
  - Expected: Pending status, no enrollment yet

### Progress Edge Cases
- [ ] Mark same lesson complete multiple times
  - Expected: Idempotent, no duplicate records
- [ ] Complete lessons out of order
  - Expected: All progress tracked correctly

### Free Course Flow
- [ ] Select FREE course
- [ ] Click "Enroll Now"
  - Expected: Direct enrollment, no payment
- [ ] Should immediately redirect to `/learn/:id`

---

## 🔍 Debugging Checklist

### If Payment Fails:
1. Check Edge Function logs: `create-payment`
2. Verify Midtrans secrets configured
3. Check `orders` table for error status
4. Inspect network tab for API errors

### If Enrollment Not Created:
1. Check Edge Function logs: `payment-webhook`
2. Verify webhook received from Midtrans
3. Check `orders.status` = `paid`
4. Inspect `enrollments` table manually

### If Progress Not Saving:
1. Check browser console for errors
2. Verify `lesson_progress` table has RLS policies
3. Check user authentication state
4. Inspect database trigger logs

### If Stats Not Updating:
1. Refresh page (not real-time yet)
2. Check database queries in Dashboard.tsx
3. Verify `enrollments` table has data
4. Check for JavaScript calculation errors

---

## ✅ Success Criteria

### Payment Flow Complete When:
- ✅ User can checkout course
- ✅ Midtrans popup works in sandbox
- ✅ Payment creates order record
- ✅ Webhook creates enrollment
- ✅ User gets course access

### Learning Flow Complete When:
- ✅ Video lessons play correctly
- ✅ Progress saves to database
- ✅ Dashboard stats are real
- ✅ My Courses shows accurate progress
- ✅ 100% completion triggers certificate

---

## 📊 Quick Test Scenario

**30-Minute Full Flow Test:**

1. **Register** → 2 min
2. **Browse & Checkout** paid course → 3 min
3. **Complete Payment** (sandbox) → 2 min
4. **Verify Enrollment** in database → 2 min
5. **Access /learn** page → 1 min
6. **Complete 3 lessons** → 5 min
7. **Check Dashboard** stats → 2 min
8. **Check My Courses** progress → 2 min
9. **Complete remaining lessons** → 8 min
10. **Verify 100% completion** → 3 min

**Total:** ~30 minutes end-to-end

---

## 🎯 Next Steps After Testing

### If All Tests Pass:
- ✅ Ready for SOFT LAUNCH
- ✅ Enable production Midtrans keys
- ✅ Add real course content
- ✅ Monitor edge function logs

### If Tests Fail:
1. Document exact error
2. Check relevant database table
3. Review edge function logs
4. Fix issue and re-test

---

## 📝 Test Results Template

```markdown
## Test Session: [DATE]
**Tester:** [NAME]
**Environment:** Development

### Payment Flow
- [ ] Checkout page loads: ✅ / ❌
- [ ] Midtrans popup works: ✅ / ❌
- [ ] Payment succeeds: ✅ / ❌
- [ ] Enrollment created: ✅ / ❌
- [ ] Course access granted: ✅ / ❌

### Learning Flow
- [ ] Video playback: ✅ / ❌
- [ ] Mark complete works: ✅ / ❌
- [ ] Progress saves: ✅ / ❌
- [ ] Dashboard updates: ✅ / ❌
- [ ] My Courses accurate: ✅ / ❌

### Issues Found:
1. [Issue description]
2. [Issue description]

### Notes:
[Any additional observations]
```

---

## 🚀 Ready for Launch Checklist

- [ ] All payment tests pass
- [ ] All learning tests pass
- [ ] Database properly seeded
- [ ] Edge functions deployed
- [ ] Midtrans production keys configured
- [ ] Error handling tested
- [ ] Mobile responsive verified
- [ ] Console has no errors

**When all checked → GO LIVE! 🎉**


public class SolutionIISE2023 {

	public String findIntersect(Node<String> headA, Node<String> headB) {
		
		if (headA.next == null || headB.next == null) {
			return "None";
		} else if (headA.next == headB.next) {
			return headB.next.data;
		}
		return "None";
	}

}
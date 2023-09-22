class Node<T> {
    T data;
    Node<T> next;
    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }
    public Node(T data) {
        this.data = data;
        next = null;
    }
}
public class TestLinkedList {
    public static void main(String[] args){
        SolutionIISE2023 sol = new SolutionIISE2023();
        Node<String> headA = new Node<String> ("마을A1");
        System.out.println("Test case 1: "+ sol.findIntersect(headA, null));
        Node<String> headB = new Node<String> ("마을B1");
        System.out.println("Test case 2: "+ sol.findIntersect(headA, headB));
        Node<String> intersection = new Node<String> ("마을2");
        headA.next = intersection;
        headB.next = intersection;
        System.out.println("Test case 3: "+ sol.findIntersect(headA, headB));
    }
}

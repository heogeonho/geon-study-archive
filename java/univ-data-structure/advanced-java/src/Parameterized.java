
public class Parameterized <T extends Comparable<T>>{
	
	public T max(T t1, T t2) {
		
		if ( t1.compareTo(t2) > 0 ) return t1;

		else if( t1.compareTo(t2) < 0 ) return t2;

		return null;
	}
}
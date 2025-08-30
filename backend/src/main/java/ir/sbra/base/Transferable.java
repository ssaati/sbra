package ir.sbra.base;

import java.io.Serializable;

public interface Transferable<I extends Serializable> {

	I getId();

	void setId(I id);

}

package SE4487.project.FoodOrderingSystem.model;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;

@Entity
public class Restaurant {
	@Id
	private Long id;
	private String name;
	private String region;
	private String rating;
	private String deliveryTime;

	public Restaurant(String name, String region, String rating, String deliveryTime) {
		this.name = name;
		this.region = region;
		this.rating = rating;
		this.deliveryTime = deliveryTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(String deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}

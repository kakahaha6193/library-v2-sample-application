package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Nhapsach.
 */
@Entity
@Table(name = "nhapsach")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nhapsach")
public class Nhapsach implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ngay_gio_nhap")
    private Instant ngayGioNhap;

    @Column(name = "so_luong")
    private Integer soLuong;

    @ManyToOne
    @JsonIgnoreProperties(value = { "sach" }, allowSetters = true)
    private Cuonsach cuonsach;

    @ManyToOne
    private Thuthu thuthu;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Nhapsach id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getNgayGioNhap() {
        return this.ngayGioNhap;
    }

    public Nhapsach ngayGioNhap(Instant ngayGioNhap) {
        this.setNgayGioNhap(ngayGioNhap);
        return this;
    }

    public void setNgayGioNhap(Instant ngayGioNhap) {
        this.ngayGioNhap = ngayGioNhap;
    }

    public Integer getSoLuong() {
        return this.soLuong;
    }

    public Nhapsach soLuong(Integer soLuong) {
        this.setSoLuong(soLuong);
        return this;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Cuonsach getCuonsach() {
        return this.cuonsach;
    }

    public void setCuonsach(Cuonsach cuonsach) {
        this.cuonsach = cuonsach;
    }

    public Nhapsach cuonsach(Cuonsach cuonsach) {
        this.setCuonsach(cuonsach);
        return this;
    }

    public Thuthu getThuthu() {
        return this.thuthu;
    }

    public void setThuthu(Thuthu thuthu) {
        this.thuthu = thuthu;
    }

    public Nhapsach thuthu(Thuthu thuthu) {
        this.setThuthu(thuthu);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Nhapsach)) {
            return false;
        }
        return id != null && id.equals(((Nhapsach) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Nhapsach{" +
            "id=" + getId() +
            ", ngayGioNhap='" + getNgayGioNhap() + "'" +
            ", soLuong=" + getSoLuong() +
            "}";
    }
}

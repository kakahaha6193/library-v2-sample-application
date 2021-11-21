package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Thuthu;
import java.util.stream.Stream;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Thuthu} entity.
 */
public interface ThuthuSearchRepository extends ElasticsearchRepository<Thuthu, Long>, ThuthuSearchRepositoryInternal {}

interface ThuthuSearchRepositoryInternal {
    Stream<Thuthu> search(String query);
}

class ThuthuSearchRepositoryInternalImpl implements ThuthuSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    ThuthuSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Stream<Thuthu> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return elasticsearchTemplate.search(nativeSearchQuery, Thuthu.class).map(SearchHit::getContent).stream();
    }
}

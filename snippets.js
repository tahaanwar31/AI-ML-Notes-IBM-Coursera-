// Code snippets keyed by data-code attribute, used for individual + bulk downloads.
const SNIPPETS = {
  "simple-linear": `# Simple Linear Regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
`,
  "polynomial": `# Polynomial Regression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)
model = LinearRegression().fit(X_poly, y)
`,
  "multiple-linear": `# Multiple Linear Regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)  # X has multiple columns
`,
  "logistic": `# Logistic Regression
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X, y)
`,
  "supervised-models": `# Supervised learning models
from sklearn.multiclass import OneVsOneClassifier, OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestRegressor
import xgboost as xgb

ovo   = OneVsOneClassifier(LogisticRegression())
ova   = OneVsRestClassifier(LogisticRegression())
dtc   = DecisionTreeClassifier(max_depth=5)
dtr   = DecisionTreeRegressor(max_depth=5)
svm   = SVC(kernel='linear', C=1.0)
knn   = KNeighborsClassifier(n_neighbors=5, weights='uniform')
rf    = RandomForestRegressor(n_estimators=100, max_depth=5)
xgbm  = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)
`,
  "clustering": `# Clustering models
from sklearn.cluster import KMeans, DBSCAN
import hdbscan

kmeans = KMeans(n_clusters=3, init='k-means++', n_init=10)
dbscan = DBSCAN(eps=0.5, min_samples=5)
hdb    = hdbscan.HDBSCAN(min_cluster_size=5)
`,
  "dim-reduction": `# Dimensionality reduction
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from umap.umap_ import UMAP

pca  = PCA(n_components=2)
tsne = TSNE(n_components=2, perplexity=30, learning_rate=200)
umap = UMAP(n_neighbors=15, min_dist=0.1, n_components=2)
`,
  "evaluation": `# Evaluation metrics
from sklearn.metrics import (classification_report, confusion_matrix,
    mean_squared_error, mean_absolute_error, r2_score,
    silhouette_score, davies_bouldin_score)

report      = classification_report(y_true, y_pred, target_names=["class1","class2"])
conf_matrix = confusion_matrix(y_true, y_pred)
mse         = mean_squared_error(y_true, y_pred)
mae         = mean_absolute_error(y_true, y_pred)
r2          = r2_score(y_true, y_pred)
sil         = silhouette_score(X, labels, metric='euclidean')
dbi         = davies_bouldin_score(X, labels)
`,
  "regularization": `# Regularization & tuning
from sklearn.linear_model import Ridge, Lasso
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV

ridge = Ridge(alpha=1.0)   # L2 - shrinks coefficients
lasso = Lasso(alpha=0.1)   # L1 - can zero out coefficients (feature selection)

pipeline = Pipeline(steps=[('scaler', StandardScaler()), ('model', Ridge())])
grid = GridSearchCV(estimator=Ridge(), param_grid={'alpha': [0.1, 1.0, 10.0]})
`,
  "titanic-project": `# Titanic project - confusion matrix & feature importance
conf_matrix = confusion_matrix(y_test, y_pred)
plt.figure()
sns.heatmap(conf_matrix, annot=True, cmap='Blues', fmt='d')
plt.title('Titanic Classification Confusion Matrix')
plt.xlabel('Predicted'); plt.ylabel('Actual')
plt.tight_layout(); plt.show()

coefficients = model.best_estimator_.named_steps['classifier'].coef_[0]
feature_names = numerical_features + list(
    model.best_estimator_.named_steps['preprocessor']
    .named_transformers_['cat'].named_steps['onehot']
    .get_feature_names_out(categorical_features)
)

importance_df = pd.DataFrame({'Feature': feature_names, 'Coefficient': coefficients}) \\
    .sort_values(by='Coefficient', ascending=False, key=abs)

plt.figure(figsize=(10, 6))
plt.barh(importance_df['Feature'], importance_df['Coefficient'].abs(), color='skyblue')
plt.gca().invert_yaxis()
plt.title('Feature Coefficient Magnitudes - Logistic Regression')
plt.xlabel('Coefficient Magnitude')
plt.show()

test_score = model.best_estimator_.score(X_test, y_test)
print(f"Test set accuracy: {test_score:.2%}")
`
};
